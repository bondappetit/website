import { useFormik, FormikContext } from 'formik';
import React, { useCallback, useState } from 'react';
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
  autoApprove,
  estimateGas,
  BN,
  useTimeoutInterval
} from 'src/common';
import { useGovernanceCost } from 'src/staking';
import { useGovernanceTokens } from './use-governance-tokens';

export type VotingGovernanceMarketModalProps = {
  open: boolean;
  onClose: () => void;
  tokenName: string;
};

export const VotingGovernanceMarketModal: React.FC<VotingGovernanceMarketModalProps> = (
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

  const formik = useFormik({
    initialValues: {
      currency: 'USDC',
      amount: '',
      payment: ''
    },

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (!formValues.currency) {
        error.currency = 'Required';
        return error;
      }

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Required';
        return error;
      }

      const balanceOfToken = new BN(balance);

      if (balanceOfToken.isLessThan(formValues.amount)) {
        error.amount = `Not enough ${formValues.currency}`;
      }

      return error;
    },

    onSubmit: async (formValues) => {
      const currentToken = network.assets[formValues.currency];

      if (!currentToken || !account || !marketContract) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      try {
        if (currentToken.name === 'ETH') {
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

          await autoApprove(
            currentContract,
            account,
            marketContract.options.address,
            formInvest
          );
          window.onbeforeunload = () => 'wait please transaction in progress';

          const buy = marketContract.methods.buy(
            currentContract.options.address,
            formInvest
          );
          await buy.send({
            from: account,
            gas: await estimateGas(buy, { from: account })
          });
        }

        failureToggle(false);
        successToggle(true);
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
      if (!formik.values.amount) {
        setResult(new BN(0));
        return;
      }

      setResult(new BN(formik.values.amount));
    },
    100,
    [formik.values.amount, formik.values.currency, tokens]
  );

  useTimeoutInterval(async () => {
    const balanceOfToken = await getBalance({
      tokenAddress: network.assets.Governance.address,
      tokenName: network.assets.Governance.name
    });

    setBalance(
      balanceOfToken
        .div(new BN(10).pow(network.assets.Governance.decimals))
        .toString(10)
    );
  }, 15000);

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
    setResult(new BN(0));
  }, [successToggle, formik]);

  const handleClose = useCallback(() => {
    props.onClose?.();
    formik.resetForm();
  }, [formik, props]);

  return (
    <>
      <FormikContext.Provider value={formik}>
        <FormModal
          onClose={handleClose}
          open={props.open}
          tokenName={props.tokenName}
          tokens={tokens}
          balance={balance}
          tokenCost={governanceInUSDC ?? '0'}
          button={
            <WalletButtonWithFallback
              disabled={
                Boolean(formik.errors.payment || formik.errors.currency) ||
                formik.isSubmitting
              }
              loading={formik.isSubmitting}
            >
              {formik.errors.payment || formik.errors.currency || 'Buy'}
            </WalletButtonWithFallback>
          }
        />
      </FormikContext.Provider>
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <SmallModal>
          <InfoCardSuccess
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
