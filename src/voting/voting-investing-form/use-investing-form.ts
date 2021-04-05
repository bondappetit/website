import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import Web3 from 'web3';
import { useToggle } from 'react-use';
import { useEffect, useRef } from 'react';

import {
  BN,
  estimateGas,
  useApprove,
  useBalance,
  useDAIContract,
  useInvestmentContract,
  useNetworkConfig,
  useUSDCContract,
  useUSDTContract
} from 'src/common';
import type { Ierc20 } from 'src/generate/IERC20';

export const useInvestingForm = (onSuccess: () => void) => {
  const network = useNetworkConfig();
  const getBalance = useBalance();

  const ref = useRef(onSuccess);

  useEffect(() => {
    ref.current = onSuccess;
  }, [onSuccess]);

  const tokenContracts: Record<string, Ierc20 | null> = {
    USDT: useUSDTContract(),
    DAI: useDAIContract(),
    USDC: useUSDCContract()
  };

  const investmentContract = useInvestmentContract();

  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);

  const { account } = useWeb3React<Web3>();

  const [approve, autoApprove] = useApprove();

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

      if (!currentToken || !account || !investmentContract) return;

      const formInvest = new BN(formValues.payment)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      const currentContract = tokenContracts[currentToken.symbol];

      try {
        if (currentToken.symbol === 'ETH') {
          const investETH = investmentContract.methods.investETH();

          await investETH.send({
            from: account,
            value: formInvest,
            gas: await estimateGas(investETH, {
              from: account,
              value: formInvest
            })
          });
        } else {
          if (!currentContract) return;

          if (!approve.value) {
            await autoApprove({
              token: currentContract,
              owner: account,
              spender: investmentContract.options.address,
              amount: formInvest
            });
          }
          window.onbeforeunload = () => 'wait please transaction in progress';

          const invest = investmentContract.methods.invest(
            currentContract.options.address,
            formInvest
          );
          if (approve.value) {
            await invest.send({
              from: account,
              gas: await estimateGas(invest, { from: account })
            });

            failureToggle(false);
            successToggle(true);
            ref.current();
          }
        }
      } catch {
        failureToggle(true);
      } finally {
        window.onbeforeunload = () => null;
        transactionToggle(false);
      }
    }
  });

  useEffect(() => {
    const handler = async () => {
      const currentToken = Object.values(network.assets).find(
        ({ symbol }) => symbol === formik.values.currency
      );

      if (!currentToken || !account || !investmentContract) return;

      const formInvest = new BN(formik.values.payment)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      const currentContract = tokenContracts[currentToken.symbol];

      if (!currentContract) return;

      await autoApprove({
        token: currentContract,
        owner: account,
        spender: investmentContract.options.address,
        amount: formInvest,
        firstCall: true
      });
    };

    handler();
  }, [
    account,
    autoApprove,
    formik.values.currency,
    formik.values.payment,
    investmentContract,
    network.assets,
    tokenContracts
  ]);

  return {
    approved: approve.value,
    formik,
    successOpen,
    successToggle,
    failureOpen,
    failureToggle,
    transactionOpen,
    transactionToggle
  };
};
