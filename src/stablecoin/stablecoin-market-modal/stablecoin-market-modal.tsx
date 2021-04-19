import { useFormik, FormikContext } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce, useToggle } from 'react-use';
import type { Ierc20 } from 'src/generate/IERC20';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import type { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { WalletButtonWithFallback } from 'src/wallets';
import {
  useNetworkConfig,
  useBalance,
  useDynamicContract,
  FormModal,
  Modal,
  SmallModal,
  InfoCardFailure,
  InfoCardLoader,
  InfoCardSuccess,
  useMarketContract,
  estimateGas,
  BN,
  useApprove,
  approveAll,
  reset,
  useIntervalIfHasAccount
} from 'src/common';
import { useGovernanceCost } from 'src/staking';
import { useGovernanceTokens } from './use-stablecoin-tokens';
import { useRewardToken } from '../common/use-reward-token';

export type StablecoinMarketModalProps = {
  open: boolean;
  onClose: () => void;
  tokenName: string;
};

export const StablecoinMarketModal: React.FC<StablecoinMarketModalProps> = (
  props
) => {
  const [balance, setBalance] = useState('0');
  const [result, setResult] = useState<BN>(new BN(0));
  const tokens = useGovernanceTokens();
  const { account } = useWeb3React<Web3>();
  const marketContract = useMarketContract();
  const network = useNetworkConfig();
  const getBalance = useBalance();
  const getContract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);

  const { governanceInUSDC } = useGovernanceCost();

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

      if (!currentToken || !account || !marketContract) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formValues.payment)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      try {
        if (currentToken.symbol === 'ETH') {
          const buyFromETH = marketContract.methods.buyFromETH();

          await buyFromETH.send({
            from: account,
            value: formInvest,
            gas: await estimateGas(buyFromETH, {
              from: account,
              value: formInvest
            })
          });
        } else {
          if (!currentContract) return;

          const options = {
            token: currentContract,
            owner: account,
            spender: marketContract.options.address,
            amount: formInvest
          };

          const approved = await approvalNeeded(options);

          if (approved.reset) {
            await reset(options);
          }
          if (approved.approve) {
            await approveAll(options);
            await approvalNeeded(options);
            return;
          }

          window.onbeforeunload = () => 'wait please transaction in progress';

          const buy = marketContract.methods.buy(
            currentContract.options.address,
            formInvest
          );

          await buy.send({
            from: account,
            gas: await estimateGas(buy, { from: account })
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

  useDebounce(
    () => {
      if (!formik.values.payment) {
        setResult(new BN(0));
        return;
      }

      setResult(new BN(formik.values.payment));
    },
    100,
    [formik.values.payment, formik.values.currency, tokens.value]
  );

  useIntervalIfHasAccount(async () => {
    const balanceOfToken = await getBalance({
      tokenAddress: network.assets.Stable.address,
      tokenName: network.assets.Stable.name
    });

    setBalance(
      balanceOfToken
        .div(new BN(10).pow(network.assets.Stable.decimals))
        .toString(10)
    );
  });

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
    setResult(new BN(0));
  }, [successToggle, formik]);

  const handleClose = useCallback(() => {
    props.onClose?.();
    formik.resetForm();
  }, [formik, props]);

  const reward = useRewardToken({
    currency: formik.values.currency,
    payment: formik.values.payment
  });

  const tokenCost = useMemo(() => {
    if (!governanceInUSDC) return '0';

    return new BN(1)
      .multipliedBy(governanceInUSDC)
      .div(new BN(10).pow(network.assets.USDC.decimals))
      .toString(10);
  }, [governanceInUSDC, network.assets.USDC.decimals]);

  const { setFieldValue } = formik;

  const handlePaymentChange = useCallback(() => {
    const youGet = reward.value?.product;

    setFieldValue(
      'youGet',
      youGet?.isNaN() || !youGet ? '0' : youGet.toString(10)
    );
  }, [reward.value, setFieldValue]);

  const handleYouGetChange = useCallback(async () => {
    const currentAsset = Object.values(network.assets).find(
      ({ symbol }) => symbol === formik.values.currency
    );

    if (!currentAsset || !marketContract) return;

    const currentAssetDiv = new BN(10).pow(currentAsset.decimals);

    const convertReward = await marketContract.methods
      .price(currentAsset.address, currentAssetDiv.toString(10))
      .call();

    const convertPrice = new BN(10)
      .pow(network.assets.Stable.decimals)
      .div(convertReward.product);

    const payment = new BN(formik.values.youGet).multipliedBy(convertPrice);

    setFieldValue(
      'payment',
      payment.isNaN() || !payment.isFinite() ? '0' : payment.toString(10)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.youGet, formik.values.currency, network]);

  useDebounce(
    () => {
      const currentToken = Object.values(network.assets).find(
        ({ symbol }) => symbol === formik.values.currency
      );

      if (
        !currentToken ||
        !account ||
        !marketContract ||
        currentToken.symbol === 'ETH'
      )
        return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formik.values.payment)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      if (!currentContract) return;

      const handler = async () => {
        await approvalNeeded({
          token: currentContract,
          owner: account,
          spender: marketContract.options.address,
          amount: formInvest
        });
      };

      handler();
    },
    200,
    [
      account,
      approvalNeeded,
      formik.values.currency,
      formik.values.payment,
      marketContract,
      getContract,
      network.assets
    ]
  );

  return (
    <>
      <FormikContext.Provider value={formik}>
        <FormModal
          onClose={handleClose}
          open={props.open}
          reward={reward.value}
          withReward
          tokenName={props.tokenName}
          tokens={tokens.value ?? []}
          balance={account ? balance : undefined}
          tokenCost={tokenCost}
          onPaymentChange={handlePaymentChange}
          onYouGetChange={handleYouGetChange}
          button={
            <WalletButtonWithFallback
              disabled={
                Boolean(formik.errors.payment || formik.errors.currency) ||
                formik.isSubmitting
              }
              loading={formik.isSubmitting}
            >
              {(!approve.value?.approve && !approve.value?.reset) ||
              new BN(formik.values.payment || '0').isLessThanOrEqualTo(0) ||
              formik.values.currency === 'ETH'
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
            tokenName={props.tokenName}
            onClick={handleSuccessClose}
            purchased={result.toString(10)}
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
