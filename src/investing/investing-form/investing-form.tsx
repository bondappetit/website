import React, { useCallback, useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import BN from 'bignumber.js';
import { useMedia, useToggle } from 'react-use';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import {
  Modal,
  useNetworkConfig,
  useInvestmentContract,
  useGovernanceTokenContract,
  useUSDTContract,
  useDAIContract,
  useUSDCContract,
  useBalance,
  BuyTokenForm,
  BuyTokenFormValues,
  InfoCardFailure,
  InfoCardSuccess,
  SmallModal,
  InfoCardLoader,
  Button,
  Typography
} from 'src/common';
import { WalletModal } from 'src/wallets';
import type { Ierc20 } from 'src/generate/IERC20';
import { useInvestingTokens } from './use-investing-tokens';
import { useInvestingFormStyles } from './investing-form.styles';

export type InvestingFormProps = {
  className?: string;
};

export const InvestingForm: React.FC<InvestingFormProps> = (props) => {
  const classes = useInvestingFormStyles();

  const tokenContracts: Record<string, Ierc20 | null> = {
    USDT: useUSDTContract(),
    DAI: useDAIContract(),
    USDC: useUSDCContract()
  };

  const getBalance = useBalance();
  const { account } = useWeb3React<Web3>();
  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);
  const [walletsOpen, walletsToggle] = useToggle(false);
  const [investOpen, investToggle] = useToggle(false);
  const [result, setResult] = useState<BN>(new BN(0));
  const network = useNetworkConfig();
  const investmentContract = useInvestmentContract();
  const tokens = useInvestingTokens();
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

      const bondBalance = await governanceContract.methods
        .balanceOf(investmentContract.options.address)
        .call();

      const governanceBalanceNumber = new BN(bondBalance).div(
        new BN(10).pow(network.assets.Governance.decimals)
      );

      if (governanceBalanceNumber.isLessThan(result)) {
        error.amountOfToken = `Looks like we don't have enough Bond`;
      }

      return error;
    },

    onSubmit: async (formValues) => {
      transactionToggle(true);

      const currentToken = tokens[formValues.currency];

      if (!currentToken || !account) return;

      const formInvest = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      const currentContract = tokenContracts[currentToken.name];

      try {
        if (currentToken.name === 'ETH') {
          const investETH = investmentContract.methods.investETH();

          await investETH.send({
            from: account,
            value: formInvest,
            gas: network.gasPrice
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
            const approveZero = currentContract.methods.approve(
              investmentContract.options.address,
              '0'
            );

            await approveZero.send({
              from: account,
              gas: await approveZero.estimateGas({ from: account })
            });
          }

          await approve.send({
            from: account,
            gas: await approve.estimateGas({ from: account })
          });
          window.onbeforeunload = () => 'wait please transaction in progress';

          await invest.send({
            from: account,
            gas: await invest.estimateGas({ from: account })
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

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
    setResult(new BN(0));
  }, [successToggle, formik]);

  const isMobile = useMedia('(max-width: 959px)');

  return (
    <>
      {isMobile && (
        <>
          <Modal open={investOpen} onClose={investToggle}>
            <SmallModal mobile>
              <FormikProvider value={formik}>
                <BuyTokenForm
                  setResult={setResult}
                  openWalletListModal={walletsToggle}
                  className={props.className}
                  account={account}
                  tokens={tokens}
                  result={result}
                  network={network}
                />
              </FormikProvider>
            </SmallModal>
          </Modal>
          <div className={classes.presale}>
            <Typography
              variant="body2"
              align="center"
              className={classes.title}
            >
              Pre-sale round price: 1 BAG = 1 USD
            </Typography>
            <Button onClick={investToggle}>Buy BAG</Button>
          </div>
        </>
      )}
      {!isMobile && (
        <FormikProvider value={formik}>
          <BuyTokenForm
            setResult={setResult}
            openWalletListModal={walletsToggle}
            className={props.className}
            account={account}
            tokens={tokens}
            result={result}
            network={network}
          />
        </FormikProvider>
      )}
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <SmallModal>
          <InfoCardSuccess
            tokenName="BAG"
            onClick={handleSuccessClose}
            purchased={result.isNaN() ? '0' : result.toFixed(2)}
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
