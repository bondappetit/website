import React, { useCallback, useEffect, useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import BN from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useToggle } from 'react-use';

import {
  useNetworkConfig,
  useMarketContract,
  useBondTokenContract,
  useUSDTContract,
  useDAIContract,
  useUSDCContract,
  useBalance,
  BuyTokenForm,
  BuyTokenFormValues,
  Typography,
  Modal,
  InfoCardFailure,
  InfoCardSuccess
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
  const getBalance = useBalance();
  const { account } = useWeb3React<Web3>();
  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [walletsOpen, walletsToggle] = useToggle(false);
  const network = useNetworkConfig();
  const [userGet, setUserGet] = useState<BN>(new BN(0));
  const marketContract = useMarketContract();
  const tokens = useMarketTokens(StableCoin.Bond);
  const bondContract = useBondTokenContract();

  const formik = useFormik<BuyTokenFormValues>({
    initialValues: {
      currency: 'USDC',
      userInvest: '10000'
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<BuyTokenFormValues> = {};

      if (!formValues.currency) {
        error.currency = '';
        return error;
      }

      if (!formValues.userInvest) {
        error.userInvest = '';
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
          .isLessThan(formValues.userInvest)
      ) {
        error.userInvest = `Looks like you don't have enough ${formValues.currency}, please check your wallet`;
      }

      return error;
    },

    onSubmit: async (formValues, { resetForm }) => {
      const currentToken = tokens[formValues.currency];

      if (
        !marketContract?.options.address ||
        !currentToken ||
        !network ||
        !account
      )
        return;

      const currentContract = tokenContracts[currentToken.name];

      try {
        const bondBalance = await bondContract?.methods
          .balanceOf(marketContract.options.address)
          .call();

        if (!bondBalance) return;

        const formInvest = new BN(formValues.userInvest)
          .multipliedBy(new BN(10).pow(currentToken.decimals))
          .toString();

        const bondBalanceNumber = new BN(bondBalance).div(
          new BN(10).pow(network.assets.Bond.decimals)
        );

        if (bondBalanceNumber.isLessThan(userGet)) return;

        if (currentToken.name === 'WETH') {
          const investETH = marketContract.methods.buyBondFromETH();

          await investETH.send({
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
                gas: await approve.estimateGas()
              });
          }

          await approve.send({
            from: account,
            gas: await approve.estimateGas()
          });
          window.onbeforeunload = () => 'wait please transaction in progress';

          await buyBond.send({
            from: account,
            gas: 2000000
          });
        }

        resetForm();
        successToggle(true);
        setUserGet(new BN(0));
      } catch {
        failureToggle(true);
      } finally {
        window.onbeforeunload = () => null;
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

  const handleCloseTooltip = useCallback(() => {
    formik.setFieldError('userInvest', '');
  }, [formik]);

  const handleGetBondBalance = useCallback(async () => {
    const balanceOfBonds = await getBalance({
      tokenAddress: bondContract?.options.address
    });

    setCanBuy(balanceOfBonds.toNumber() > 0);
  }, [bondContract, getBalance]);

  useEffect(() => {
    handleGetBondBalance();
  }, [handleGetBondBalance]);

  return (
    <>
      <FormikProvider value={formik}>
        <div className={props.className}>
          {!canBuy && (
            <Typography variant="body1">
              sorry but you can&apos;t buy token
            </Typography>
          )}
          <BuyTokenForm
            handleCloseTooltip={handleCloseTooltip}
            handleOpenWalletListModal={handleOpenWalletListModal}
            account={account}
            tokens={tokens}
            network={network}
            userGet={userGet}
            setUserGet={setUserGet}
          />
        </div>
      </FormikProvider>
      <Modal open={successOpen} onClose={successToggle}>
        <InfoCardSuccess
          onClick={successToggle}
          purchased={userGet.isNaN() ? '0' : userGet.toFixed(2)}
        />
      </Modal>
      <Modal open={failureOpen} onClose={failureToggle}>
        <InfoCardFailure onClick={formik.submitForm} />
      </Modal>
      <WalletModal open={walletsOpen} onClose={walletsToggle} />
    </>
  );
};
