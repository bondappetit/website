import React, { useCallback, useEffect, useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import BN from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useToggle } from 'react-use';

import {
  useNetworkConfig,
  useMarketContract,
  useStableCoinContract,
  useUSDTContract,
  useDAIContract,
  useUSDCContract,
  useBalance,
  BuyTokenForm,
  Modal,
  InfoCardFailure,
  InfoCardSuccess,
  BuyTokenFormValues,
  Typography,
  SmallModal,
  InfoCardLoader
} from 'src/common';
import { WalletModal } from 'src/wallets';
import type { Ierc20 } from 'src/generate/IERC20';
import { useMarketTokens, StableCoin } from 'src/market/common';

export type MarketBuyStableTokenProps = {
  className?: string;
};

const DEFAULT_GAS = 2000000;

export const MarketBuyStableToken: React.FC<MarketBuyStableTokenProps> = (
  props
) => {
  const [userGet, setUserGet] = useState<BN>(new BN(0));
  const tokenContracts: Record<string, Ierc20 | null> = {
    USDT: useUSDTContract(),
    DAI: useDAIContract(),
    USDC: useUSDCContract()
  };

  const getBalance = useBalance();
  const { account } = useWeb3React<Web3>();
  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [walletsOpen, walletsToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);
  const [availableTokens, setAvailableTokens] = useState('');
  const network = useNetworkConfig();
  const marketContract = useMarketContract();
  const tokens = useMarketTokens(StableCoin.Stable);
  const stableCoinContract = useStableCoinContract();

  const formik = useFormik<BuyTokenFormValues>({
    initialValues: {
      currency: 'USDC',
      amount: '10000'
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<BuyTokenFormValues> = {};

      if (!formValues.currency) {
        error.currency = '';
        return error;
      }

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Required';
        return error;
      }

      const currentToken = tokens[formValues.currency];

      if (!currentToken) return;

      const balanceOfToken = await getBalance({
        tokenAddress: currentToken.address,
        tokenName: currentToken.name
      });

      if (
        balanceOfToken
          .div(new BN(10).pow(currentToken.decimals))
          .isLessThan(formValues.amount)
      ) {
        error.amount = `Looks like you don't have enough ${formValues.currency}, please check your wallet`;
      }

      const abtBalance = await stableCoinContract.methods
        .balanceOf(marketContract.options.address)
        .call();

      const abtBalanceNumber = new BN(abtBalance).div(
        new BN(10).pow(network.assets.Stable.decimals)
      );

      if (abtBalanceNumber.isLessThan(userGet)) {
        error.amountOfToken = `Looks like we don't have enough USDp`;
      }

      return error;
    },

    onSubmit: async (formValues) => {
      transactionToggle(true);

      const currentToken = tokens[formValues.currency];

      if (!currentToken || !account) return;

      const currentContract = tokenContracts[currentToken.name];

      const formInvest = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      try {
        if (currentToken.name === 'ETH') {
          const buyStableTokenFromETH = marketContract.methods.buyStableTokenFromETH();

          await buyStableTokenFromETH.send({
            from: account,
            value: formInvest,
            gas: DEFAULT_GAS
          });
        } else {
          if (!currentContract) return;

          const buyStableToken = marketContract.methods.buyStableToken(
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

          await buyStableToken.send({
            from: account,
            gas: await buyStableToken.estimateGas({ from: account })
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

  const handleOpenWalletListModal = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      walletsToggle();
    },
    [walletsToggle]
  );

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
    setUserGet(new BN(0));
  }, [successToggle, formik]);

  const handleGetAvailableTokens = useCallback(async () => {
    const balanceOfGovernance = await getBalance({
      tokenAddress: stableCoinContract.options.address,
      accountAddress: marketContract.options.address
    });

    setAvailableTokens(
      balanceOfGovernance
        .div(new BN(10).pow(network.assets.Governance.decimals))
        .toString(10)
    );
  }, [stableCoinContract, getBalance, marketContract, network]);

  useEffect(() => {
    handleGetAvailableTokens();
  }, [handleGetAvailableTokens]);

  return (
    <>
      <FormikProvider value={formik}>
        <div className={props.className}>
          <Typography variant="body1">
            available tokens on market {availableTokens}
          </Typography>
          <BuyTokenForm
            handleOpenWalletListModal={handleOpenWalletListModal}
            account={account}
            tokens={tokens}
            network={network}
            userGet={userGet}
            amountLabel="Amount"
            setUserGet={setUserGet}
            tokenName="USDp"
          />
        </div>
      </FormikProvider>
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <SmallModal>
          <InfoCardSuccess
            tokenName="USDp"
            onClick={handleSuccessClose}
            purchased={userGet.isNaN() ? '0' : userGet.toFixed(2)}
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