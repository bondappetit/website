import { FormikProvider } from 'formik';
import React, { useCallback, useState } from 'react';
import { useAsyncRetry } from 'react-use';

import {
  BN,
  FormModal,
  InfoCardFailure,
  InfoCardLoader,
  InfoCardSuccess,
  Modal,
  SmallModal,
  useBalance,
  useInvestmentContract,
  useNetworkConfig,
  useTimeoutInterval
} from 'src/common';
import { WalletModal } from 'src/wallets';
import { useInvestingTokens } from './use-investing-tokens';
import { useInvestingForm } from './use-investing-form';

export type VotingInvestingFormProps = {
  open: boolean;
  onClose: () => void;
};

export const VotingInvestingForm: React.VFC<VotingInvestingFormProps> = (
  props
) => {
  const {
    formik,
    walletsToggle,
    successOpen,
    walletsOpen,
    failureToggle,
    failureOpen,
    transactionOpen,
    successToggle
  } = useInvestingForm();
  const network = useNetworkConfig();

  const investmentContract = useInvestmentContract();

  const [balance, setBalance] = useState('');

  const getBalance = useBalance();

  const tokens = useInvestingTokens();

  useTimeoutInterval(
    async () => {
      const balanceOfToken = await getBalance({
        tokenAddress: network.assets.Governance.address,
        tokenName: network.assets.Governance.symbol
      });

      setBalance(
        balanceOfToken
          .div(new BN(10).pow(network.assets.Governance.decimals))
          .toString(10)
      );
    },
    15000,
    getBalance
  );

  const price = useAsyncRetry(async () => {
    const currentToken = network.assets[formik.values.currency];

    if (!currentToken || !investmentContract) return;

    const priceOfToken = await investmentContract.methods
      .price(
        currentToken.address,
        new BN(10).pow(currentToken.decimals).toString(10)
      )
      .call();

    return new BN(priceOfToken)
      .div(new BN(10).pow(network.assets.Governance.decimals))
      .toString(10);
  }, [formik.values.currency]);

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
  }, [successToggle, formik]);

  const { setFieldValue } = formik;

  const handlePaymentChange = useCallback(() => {
    const youGet = new BN(formik.values.payment).multipliedBy(
      price.value ?? ''
    );

    setFieldValue('youGet', !youGet.isFinite() ? '0' : youGet.toString(10));
  }, [formik.values.payment, price.value, setFieldValue]);

  const handleYouGetChange = useCallback(() => {
    const payment = new BN(formik.values.youGet).div(price.value ?? '');

    setFieldValue('payment', !payment.isFinite() ? '0' : payment.toString(10));
  }, [formik.values.youGet, price.value, setFieldValue]);

  const handleClose = () => {
    props.onClose();
    formik.resetForm();
  };

  return (
    <>
      <FormikProvider value={formik}>
        <FormModal
          open={props.open}
          onClose={handleClose}
          tokenName="BAG"
          balance={balance}
          tokenCost={price.value ?? '0'}
          tokens={tokens.value ?? []}
          onOpenWallet={walletsToggle}
          onPaymentChange={handlePaymentChange}
          onYouGetChange={handleYouGetChange}
        />
      </FormikProvider>
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <SmallModal>
          <InfoCardSuccess
            tokenName="BAG"
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
      <WalletModal open={walletsOpen} onClose={walletsToggle} />
    </>
  );
};
