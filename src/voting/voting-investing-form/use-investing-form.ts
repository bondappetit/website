import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import Web3 from 'web3';
import { useToggle } from 'react-use';

import {
  autoApprove,
  BN,
  estimateGas,
  useBalance,
  useDAIContract,
  useInvestmentContract,
  useNetworkConfig,
  useUSDCContract,
  useUSDTContract
} from 'src/common';
import type { Ierc20 } from 'src/generate/IERC20';

export const useInvestingForm = () => {
  const network = useNetworkConfig();
  const getBalance = useBalance();

  const tokenContracts: Record<string, Ierc20> = {
    USDT: useUSDTContract(),
    DAI: useDAIContract(),
    USDC: useUSDCContract()
  };

  const investmentContract = useInvestmentContract();

  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [walletsOpen, walletsToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);

  const { account } = useWeb3React<Web3>();

  const formik = useFormik({
    initialValues: {
      currency: 'USDC',
      payment: '',
      youGet: ''
    },

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (!formValues.currency) {
        error.currency = 'Choose currency';
        return error;
      }

      if (Number(formValues.payment) <= 0) {
        error.payment = 'payment of currency is required';
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

      if (!currentToken || !account) return;

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

          await autoApprove(
            currentContract,
            account,
            investmentContract.options.address,
            formInvest
          );
          window.onbeforeunload = () => 'wait please transaction in progress';

          const invest = investmentContract.methods.invest(
            currentContract.options.address,
            formInvest
          );
          await invest.send({
            from: account,
            gas: await estimateGas(invest, { from: account })
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

  return {
    formik,
    successOpen,
    successToggle,
    failureOpen,
    failureToggle,
    walletsOpen,
    walletsToggle,
    transactionOpen,
    transactionToggle
  };
};
