import { useFormik, FormikContext } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
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
  useMarketContract,
  autoApprove,
  estimateGas,
  BN,
  useTimeoutInterval
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
  const [walletsOpen, walletsToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);

  const { governanceInUSDC } = useGovernanceCost();

  const formik = useFormik({
    initialValues: {
      currency: 'USDC',
      payment: ''
    },

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (!formValues.currency) {
        error.currency = 'Required';
        return error;
      }

      if (Number(formValues.payment) <= 0) {
        error.payment = 'Required';
        return error;
      }

      const currentToken = network.assets[formValues.currency];

      if (!currentToken) return;

      const balanceOfToken = await getBalance({
        tokenAddress: currentToken.address,
        tokenName: currentToken.name
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

      if (!currentToken || !account) return;

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
      if (!formik.values.payment) {
        setResult(new BN(0));
        return;
      }

      setResult(new BN(formik.values.payment));
    },
    100,
    [formik.values.payment, formik.values.currency, tokens.value]
  );

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

  const tokenCost = useMemo(
    () =>
      new BN(1)
        .multipliedBy(governanceInUSDC)
        .div(new BN(10).pow(network.assets.USDC.decimals))
        .toString(10),
    [governanceInUSDC, network.assets.USDC.decimals]
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
          balance={balance}
          tokenCost={tokenCost}
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
          <InfoCardLoader />
        </SmallModal>
      </Modal>
      <WalletModal open={walletsOpen} onClose={walletsToggle} />
    </>
  );
};
