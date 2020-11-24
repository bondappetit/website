import React, { useCallback, useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import BN from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useToggle } from 'react-use';

import {
  Modal,
  useNetworkConfig,
  useInvestmentContract,
  useBondTokenContract,
  useUSDTContract,
  useDAIContract,
  useUSDCContract,
  useBalance,
  BuyTokenForm,
  BuyTokenFormValues,
  InfoCardFailure,
  InfoCardSuccess
} from 'src/common';
import { WalletModal } from 'src/wallets';
import type { Ierc20 } from 'src/generate/IERC20';
import { useInvestingTokens } from './common';

export type InvestingProps = {
  className?: string;
};

export const Investing: React.FC<InvestingProps> = (props) => {
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
  const [userGet, setUserGet] = useState<BN>(new BN(0));
  const network = useNetworkConfig();
  const investmentContract = useInvestmentContract();
  const tokens = useInvestingTokens();
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
        !investmentContract?.options.address ||
        !currentToken ||
        !network ||
        !account
      )
        return;

      const currentContract = tokenContracts[currentToken.name];

      try {
        const bondBalance = await bondContract?.methods
          .balanceOf(investmentContract.options.address)
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
          const investETH = investmentContract.methods.investETH();

          await investETH.send({
            from: account,
            value: formInvest,
            gas: 2000000
          });
        } else {
          if (!currentContract) return;

          const invest = investmentContract.methods.invest(
            currentContract.options.address,
            formInvest
          );

          const approve = currentContract.methods.approve(
            investmentContract.options.address,
            formInvest
          );

          const allowance = await currentContract.methods
            .allowance(account, investmentContract.options.address)
            .call();

          if (allowance !== '0') {
            await currentContract.methods
              .approve(investmentContract.options.address, '0')
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

          await invest.send({
            from: account,
            gas: 2000000
          });
        }

        resetForm();
        failureToggle(false);
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

  return (
    <>
      <FormikProvider value={formik}>
        <BuyTokenForm
          setUserGet={setUserGet}
          handleCloseTooltip={handleCloseTooltip}
          handleOpenWalletListModal={handleOpenWalletListModal}
          className={props.className}
          account={account}
          tokens={tokens}
          userGet={userGet}
          network={network}
        />
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
