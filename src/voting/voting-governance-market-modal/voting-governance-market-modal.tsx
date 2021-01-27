import { useFormik, FormikContext } from 'formik';
import React, { useCallback, useState } from 'react';
import BN from 'bignumber.js';
import { useDebounce, useToggle } from 'react-use';
import type { Ierc20 } from 'src/generate/IERC20';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import type { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { WalletModal } from 'src/wallets';
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
  useMarketContract
} from 'src/common';
import { useGovernanceCost } from 'src/staking';
import { useGovernanceTokens } from './use-governance-tokens';

export type VotingGovernanceMarketModalProps = {
  open: boolean;
  onClose: () => void;
  tokenName: string;
};

const DEFAULT_GAS = 2000000;

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
  const [walletsOpen, walletsToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);

  const { governanceInUSDC } = useGovernanceCost();

  const formik = useFormik({
    initialValues: {
      currency: 'USDC',
      amount: ''
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

      if (!currentToken || !account) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      try {
        if (currentToken.name === 'ETH') {
          const buyGovernanceTokenFromETH = marketContract.methods.buyGovernanceTokenFromETH();

          await buyGovernanceTokenFromETH.send({
            from: account,
            value: formInvest,
            gas: DEFAULT_GAS
          });
        } else {
          if (!currentContract) return;

          const buyGovernanceToken = marketContract.methods.buyGovernanceToken(
            currentContract.options.address,
            formInvest
          );

          const approve = currentContract.methods.approve(
            marketContract.options.address,
            formInvest
          );

          const allowance = await currentContract.methods
            .allowance(account, marketContract.options.address)
            .call();

          if (allowance !== '0') {
            await currentContract.methods
              .approve(marketContract.options.address, '0')
              .send({
                from: account,
                gas: await approve.estimateGas({ from: account })
              });
          }

          await approve.send({
            from: account,
            gas: await approve.estimateGas({ from: account })
          });
          window.onbeforeunload = () => 'wait please transaction in progress';

          await buyGovernanceToken.send({
            from: account,
            gas: await buyGovernanceToken.estimateGas({ from: account })
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

  useDebounce(
    async () => {
      const balanceOfToken = await getBalance({
        tokenAddress: network.assets.Governance.address,
        tokenName: network.assets.Governance.name
      });

      setBalance(
        balanceOfToken
          .div(new BN(10).pow(network.assets.Governance.decimals))
          .toString(10)
      );
    },
    100,
    []
  );

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
          tokenCost={governanceInUSDC}
          result={result.toString(10)}
          openWalletListModal={walletsToggle}
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
          <InfoCardLoader isAnimating={transactionOpen} />
        </SmallModal>
      </Modal>
      <WalletModal open={walletsOpen} onClose={walletsToggle} />
    </>
  );
};
