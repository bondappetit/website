import { useFormik, FormikContext } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import type { Ierc20 } from 'src/generate/IERC20';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import type { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { WalletButtonWithFallback } from 'src/wallets';
import {
  useCollateralMarketContract,
  useNetworkConfig,
  useBalance,
  useDynamicContract,
  FormModal,
  Modal,
  SmallModal,
  InfoCardFailure,
  InfoCardLoader,
  InfoCardSuccess,
  estimateGas,
  BN,
  useTimeoutInterval,
  useApprove,
  approveAll,
  reset
} from 'src/common';
import { useStablecoinTokens } from './use-stablecoin-tokens';

export type StablecoinCollateralMarketModalProps = {
  open: boolean;
  onClose: () => void;
  tokenName: string;
};

export const StablecoinCollateralMarketModal: React.FC<StablecoinCollateralMarketModalProps> = (
  props
) => {
  const [balance, setBalance] = useState('0');
  const tokens = useStablecoinTokens();
  const { account } = useWeb3React<Web3>();
  const collateralMarketContract = useCollateralMarketContract();
  const network = useNetworkConfig();
  const getBalance = useBalance();
  const getContract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);

  const [approve, approvalNeeded] = useApprove();

  const formik = useFormik({
    initialValues: {
      currency: 'USDC',
      payment: '0',
      youGet: '0'
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (!formValues.currency) {
        error.currency = 'Choose currency';
        return error;
      }

      if (Number(formValues.payment) <= 0) {
        error.payment = `${formValues.currency} is required`;
        return error;
      }

      const currentToken = Object.values(network.assets).find(
        ({ symbol }) => symbol === formValues.currency
      );

      if (!currentToken) return;

      const balanceOfToken = await getBalance({
        tokenAddress: currentToken.address,
        tokenName: currentToken.symbol
      });

      if (
        balanceOfToken
          .div(new BN(10).pow(currentToken.decimals))
          .isLessThan(formValues.payment)
      ) {
        error.payment = `Not enough ${formValues.currency}`;
      }

      return error;
    },

    onSubmit: async (formValues) => {
      const currentToken = Object.values(network.assets).find(
        ({ symbol }) => symbol === formValues.currency
      );

      if (!currentToken || !account || !collateralMarketContract) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formValues.payment)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      try {
        const options = {
          token: currentContract,
          owner: account,
          spender: collateralMarketContract.options.address,
          amount: formInvest
        };

        const approved = await approvalNeeded(options);

        if (approved.reset) {
          await reset(options);
        }
        if (approved.approve) {
          await approveAll(options);
          return;
        }

        window.onbeforeunload = () => 'wait please transaction in progress';

        if (!approved.reset && !approved.approve) {
          const buyStableToken = collateralMarketContract.methods.buy(
            currentContract.options.address,
            formInvest
          );
          await buyStableToken.send({
            from: account,
            gas: await estimateGas(buyStableToken, { from: account })
          });

          failureToggle(false);
          successToggle(true);
          tokens.retry();
        }
      } catch {
        failureToggle(true);
      } finally {
        window.onbeforeunload = () => null;
        transactionToggle(false);
      }
    }
  });

  useTimeoutInterval(
    async () => {
      const balanceOfToken = await getBalance({
        tokenAddress: network.assets.Stable.address,
        tokenName: network.assets.Stable.name
      });

      setBalance(
        balanceOfToken
          .div(new BN(10).pow(network.assets.Stable.decimals))
          .toString(10)
      );
    },
    15000,
    getBalance
  );

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
  }, [successToggle, formik]);

  const handleClose = useCallback(() => {
    props.onClose?.();
    formik.resetForm();
  }, [formik, props]);

  const { setFieldValue } = formik;

  useEffect(() => {
    const payment = new BN(formik.values.payment);

    setFieldValue('youGet', payment.isNaN() ? '0' : payment.toString(10));
  }, [formik.values.payment, setFieldValue]);

  useEffect(() => {
    const youGet = new BN(formik.values.youGet);

    setFieldValue('payment', youGet.isNaN() ? '0' : youGet.toString(10));
  }, [formik.values.youGet, formik.values.currency, setFieldValue]);

  useEffect(() => {
    const handle = async () => {
      const currentToken = Object.values(network.assets).find(
        ({ symbol }) => symbol === formik.values.currency
      );

      if (!currentToken || !account || !collateralMarketContract) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formik.values.payment)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      if (!currentContract) return;

      await approvalNeeded({
        token: currentContract,
        owner: account,
        spender: collateralMarketContract.options.address,
        amount: formInvest
      });
    };

    handle();
  }, [
    approvalNeeded,
    collateralMarketContract,
    account,
    formik.values.currency,
    formik.values.payment,
    network.assets,
    getContract
  ]);

  return (
    <>
      <FormikContext.Provider value={formik}>
        <FormModal
          onClose={handleClose}
          open={props.open}
          tokenName="USDap"
          tokens={tokens.value ?? []}
          balance={balance}
          tokenCost="1"
          button={
            <WalletButtonWithFallback
              disabled={
                Boolean(formik.errors.payment || formik.errors.currency) ||
                formik.isSubmitting
              }
              loading={formik.isSubmitting}
            >
              {!approve.value?.approve && !approve.value?.reset
                ? formik.errors.payment || formik.errors.currency || 'Buy'
                : 'Approve'}
            </WalletButtonWithFallback>
          }
        />
      </FormikContext.Provider>
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <SmallModal>
          <InfoCardSuccess
            token="Stable"
            tokenName="USDap"
            onClick={handleSuccessClose}
            purchased={formik.values.youGet}
          />
        </SmallModal>
      </Modal>
      <Modal open={failureOpen} onClose={failureToggle}>
        <SmallModal>
          <InfoCardFailure onClick={formik.submitForm} />
        </SmallModal>
      </Modal>
      <Modal open={transactionOpen}>
        <SmallModal>
          <InfoCardLoader />
        </SmallModal>
      </Modal>
    </>
  );
};
