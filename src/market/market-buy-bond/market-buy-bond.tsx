import React, { useCallback, useEffect, useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import BN from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useToggle } from 'react-use';

import {
  useNetworkConfig,
  useMarketContract,
  useGovernanceTokenContract,
  useUSDTContract,
  useDAIContract,
  useUSDCContract,
  useBalance,
  BuyTokenForm,
  BuyTokenFormValues,
  Typography,
  Modal,
  InfoCardFailure,
  InfoCardSuccess,
  FullpageModal,
  InfoCardLoader
} from 'src/common';
import { WalletModal } from 'src/wallets';
import type { Ierc20 } from 'src/generate/IERC20';
import { useMarketTokens, StableCoin } from 'src/market/common';

export type MarketBuyBondProps = {
  className?: string;
};

export const MarketBuyBond: React.FC<MarketBuyBondProps> = (props) => {
  const tokenContracts: Record<string, Ierc20 | null> = {
    USDT: useUSDTContract(),
    DAI: useDAIContract(),
    USDC: useUSDCContract()
  };
  const [canBuy, setCanBuy] = useState(false);
  const [availableTokens, setAvailableTokens] = useState('');
  const [governancePriceOnMarket, setBondPriceOnMarket] = useState('');
  const getBalance = useBalance();
  const { account } = useWeb3React<Web3>();
  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [walletsOpen, walletsToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);
  const network = useNetworkConfig();
  const [userGet, setUserGet] = useState<BN>(new BN(0));
  const marketContract = useMarketContract();
  const tokens = useMarketTokens(StableCoin.Governance);
  const governanceContract = useGovernanceTokenContract();

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

      const governanceBalance = await governanceContract.methods
        .balanceOf(marketContract.options.address)
        .call();

      const governanceBalanceNumber = new BN(governanceBalance).div(
        new BN(10).pow(network.assets.Governance.decimals)
      );

      if (governanceBalanceNumber.isLessThan(userGet)) {
        error.amountOfToken = `Looks like we don't have enough Bond`;
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
        .toString();

      try {
        if (currentToken.name === 'WETH') {
          const buyBondFromETH = marketContract.methods.buyBondFromETH();

          await buyBondFromETH.send({
            from: account,
            value: formInvest,
            gas: 2000000
          });
        } else {
          if (!currentContract) return;

          const buyBond = marketContract.methods.buyBond(
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

          await buyBond.send({
            from: account,
            gas: 2000000
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

  const handleGetGovernanceBalance = useCallback(async () => {
    const balanceOfGovernance = await getBalance({
      tokenAddress: governanceContract.options.address
    });

    setCanBuy(balanceOfGovernance.toNumber() > 0);
  }, [governanceContract, getBalance]);

  const handleGetAvailableTokens = useCallback(async () => {
    const balanceOfGovernance = await getBalance({
      tokenAddress: governanceContract.options.address,
      accountAddress: marketContract.options.address
    });

    setAvailableTokens(
      balanceOfGovernance
        .div(new BN(10).pow(network.assets.Governance.decimals))
        .toString()
    );
  }, [governanceContract, getBalance, marketContract, network]);

  const handleGetGovernancePrice = useCallback(async () => {
    const bondPrice = await marketContract.methods.bondPrice().call();

    if (!bondPrice) return;

    setBondPriceOnMarket(new BN(bondPrice).div(new BN(10).pow(6)).toString());
  }, [marketContract]);

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
    setUserGet(new BN(0));
  }, [successToggle, formik]);

  useEffect(() => {
    handleGetGovernanceBalance();
    handleGetAvailableTokens();
    handleGetGovernancePrice();
  }, [
    handleGetGovernanceBalance,
    handleGetAvailableTokens,
    handleGetGovernancePrice
  ]);

  return (
    <>
      <FormikProvider value={formik}>
        <div className={props.className}>
          {!canBuy && (
            <Typography variant="body1">
              Sorry, only token holder can buy BAG token at market
            </Typography>
          )}
          <Typography variant="body1">
            Available tokens on market {availableTokens}
          </Typography>
          <Typography variant="body1">
            Token price ${governancePriceOnMarket}
          </Typography>
          <BuyTokenForm
            disabled={!canBuy}
            handleOpenWalletListModal={handleOpenWalletListModal}
            account={account}
            tokens={tokens}
            amountLabel="Amount"
            network={network}
            userGet={userGet}
            setUserGet={setUserGet}
          />
        </div>
      </FormikProvider>
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <FullpageModal>
          <InfoCardSuccess
            tokenName="BAG"
            onClick={handleSuccessClose}
            purchased={userGet.isNaN() ? '0' : userGet.toFixed(2)}
          />
        </FullpageModal>
      </Modal>
      <Modal open={failureOpen} onClose={failureToggle}>
        <FullpageModal>
          <InfoCardFailure onClick={formik.submitForm} />
        </FullpageModal>
      </Modal>
      <Modal open={transactionOpen}>
        <FullpageModal>
          <InfoCardLoader isAnimating={transactionOpen} />
        </FullpageModal>
      </Modal>
      <WalletModal open={walletsOpen} onClose={walletsToggle} />
    </>
  );
};
