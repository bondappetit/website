import { useWeb3React } from '@web3-react/core';
import { FormikContext, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useAsyncRetry, useDebounce, useToggle } from 'react-use';
import type { IERC20 } from 'src/generate/IERC20';
import IERC20Abi from '@bondappetit/networks/abi/IERC20.json';
import { AbiItem } from 'web3-utils';

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
  estimateGas,
  BN,
  useApprove,
  approveAll,
  reset,
  useIntervalIfHasAccount,
  useBuybackDepositaryBalanceView,
  useModal,
  useUSDCContract
} from 'src/common';
import { WalletButtonWithFallback } from 'src/wallets';

export type StablecoinBuybackModalProps = {
  className?: string;
  open?: boolean;
  onClose?: () => void;
};

export const StablecoinBuybackModal: React.VFC<StablecoinBuybackModalProps> = (
  props
) => {
  const buybackDepositary = useBuybackDepositaryBalanceView();

  const [approve, approvalNeeded] = useApprove();

  const { account = null } = useWeb3React();

  const network = useNetworkConfig();

  const getBalance = useBalance();

  const getContract = useDynamicContract<IERC20>({
    abi: IERC20Abi.abi as AbiItem[]
  });

  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);

  const stableBalance = useAsyncRetry(async () => {
    const balanceOfToken = await getBalance({
      tokenAddress: network.assets.Stable.address,
      tokenName: network.assets.Stable.name
    });

    const balance = balanceOfToken
      .div(new BN(10).pow(network.assets.Stable.decimals))
      .toString(10);

    return [
      {
        ...network.assets.Stable,
        balance
      }
    ];
  }, [network.assets.Stable]);

  const usdcBalance = useAsyncRetry(async () => {
    const balanceOfToken = await getBalance({
      tokenAddress: network.assets.USDC.address,
      tokenName: network.assets.USDC.name
    });

    const balance = balanceOfToken
      .div(new BN(10).pow(network.assets.USDC.decimals))
      .toString(10);

    return balance;
  }, [network.assets.USDC]);

  const usdcContract = useUSDCContract();

  const formik = useFormik({
    initialValues: {
      currency: 'USDap',
      payment: '0',
      youGet: '0'
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const errors: Partial<typeof formValues> = {};

      if (!formValues.currency) {
        errors.currency = 'Choose currency';
      }

      if (new BN(formValues.payment).isLessThanOrEqualTo(0)) {
        errors.payment = `${formValues.currency} is required`;
      }

      const currentToken = Object.values(network.assets).find(
        ({ symbol }) => symbol === formValues.currency
      );

      if (!currentToken || !buybackDepositary || !usdcContract) return errors;

      const buybackBalance = new BN(
        await usdcContract?.methods
          .balanceOf(buybackDepositary.options.address)
          .call()
      ).div(new BN(10).pow(network.assets.USDC.decimals));

      if (buybackBalance.isLessThan(formValues.youGet)) {
        errors.youGet = 'Not enough USDC';
      }

      const balanceOfToken = await getBalance({
        tokenAddress: currentToken.address,
        tokenName: currentToken.symbol
      });

      if (
        balanceOfToken
          .div(new BN(10).pow(currentToken.decimals))
          .isLessThan(formValues.payment)
      ) {
        errors.payment = `Not enough ${formValues.currency}`;
      }

      return errors;
    },

    onSubmit: async (formValues) => {
      const currentToken = Object.values(network.assets).find(
        ({ symbol }) => symbol === formValues.currency
      );

      if (!currentToken || !account || !buybackDepositary) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formValues.payment)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      try {
        const options = {
          token: currentContract,
          owner: account,
          spender: buybackDepositary.options.address,
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

        const buyUSDC = buybackDepositary.methods.buy(formInvest);
        await buyUSDC.send({
          from: account,
          gas: await estimateGas(buyUSDC, { from: account })
        });

        failureToggle(false);
        successToggle(true);
        usdcBalance.retry();
        stableBalance.retry();
      } catch {
        failureToggle(true);
      } finally {
        window.onbeforeunload = () => null;
        transactionToggle(false);
      }
    }
  });

  useDebounce(
    async () => {
      const currentToken = Object.values(network.assets).find(
        ({ symbol }) => symbol === formik.values.currency
      );

      if (!currentToken || !account || !buybackDepositary) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formik.values.payment)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      if (!currentContract) return;

      await approvalNeeded({
        token: currentContract,
        owner: account,
        spender: buybackDepositary.options.address,
        amount: formInvest
      });
    },
    200,
    [
      approvalNeeded,
      buybackDepositary,
      account,
      formik.values.currency,
      formik.values.payment,
      network.assets
    ]
  );

  useIntervalIfHasAccount(() => {
    usdcBalance.retry();
    stableBalance.retry();
  });

  const handleSuccessClose = () => {
    successToggle(false);
    formik.resetForm();
  };

  const { setFieldValue } = formik;

  useEffect(() => {
    const payment = new BN(formik.values.payment);

    setFieldValue('youGet', payment.isNaN() ? '0' : payment.toString(10));
  }, [formik.values.payment, setFieldValue]);

  useEffect(() => {
    const youGet = new BN(formik.values.youGet);

    setFieldValue('payment', youGet.isNaN() ? '0' : youGet.toString(10));
  }, [formik.values.youGet, formik.values.currency, setFieldValue]);

  const errorMessage =
    formik.errors.payment || formik.errors.currency || formik.errors.youGet;

  return (
    <div>
      <FormikContext.Provider value={formik}>
        <FormModal
          open
          onClose={props.onClose}
          tokenCost="1"
          tokenName="USDC"
          tokens={stableBalance.value ?? []}
          balance={usdcBalance.value}
          button={
            <WalletButtonWithFallback
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            >
              {errorMessage ||
                ((!approve.value?.approve && !approve.value?.reset) ||
                new BN(formik.values.payment || '0').isLessThanOrEqualTo(0)
                  ? 'Swap USDap to USDC'
                  : 'Approve')}
            </WalletButtonWithFallback>
          }
        />
      </FormikContext.Provider>
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <SmallModal>
          <InfoCardSuccess
            onClick={handleSuccessClose}
            purchased={formik.values.youGet}
            token="USDC"
            tokenName="USDC"
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
    </div>
  );
};

export const useStablecoinBuybackModal = () =>
  useModal(<StablecoinBuybackModal />);
