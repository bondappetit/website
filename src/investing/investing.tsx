import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import BN from 'bignumber.js';
import clsx from 'clsx';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useDebounce } from 'react-use';
import Tippy from '@tippyjs/react';

import {
  Input,
  Button,
  Modal,
  Select,
  SelectOption,
  useNetworkConfig,
  useInvestmentContract,
  useBondTokenContract,
  useUSDTContract,
  useDAIContract,
  useUSDCContract
} from 'src/common';
import { WalletModal } from 'src/wallets';
import type { Ierc20 } from 'src/generate/IERC20';
import { InvestingSuccess, InvestingFailure } from './common';
import { useInvestingStyles } from './investing.styles';
import { useInvestingTokens } from './investing-tokens';

export type InvestingProps = {
  className?: string;
};

export type InvestFormValues = {
  currency: string;
  userInvest: string;
};

export const Investing: React.FC<InvestingProps> = (props) => {
  const tokenContracts: Record<string, Ierc20 | null> = {
    USDT: useUSDTContract(),
    DAI: useDAIContract(),
    USDC: useUSDCContract()
  };

  const { account, library } = useWeb3React<Web3>();
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [walletsOpen, setWalletsOpen] = useState(false);
  const [userGet, setUserGet] = useState<BN>(new BN(0));
  const classes = useInvestingStyles();
  const network = useNetworkConfig();
  const investmentContract = useInvestmentContract();
  const tokens = useInvestingTokens();
  const bondContract = useBondTokenContract();

  const formik = useFormik<InvestFormValues>({
    initialValues: {
      currency: 'USDC',
      userInvest: '10000'
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<InvestFormValues> = {};

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

      const currentContract = tokenContracts[currentToken.name];

      if (!account || !library) return;

      let balanceOfToken = await currentContract?.methods
        .balanceOf(account)
        .call();

      if (currentToken.name === 'WETH') {
        balanceOfToken = await library.eth.getBalance(account);
      }

      if (
        new BN(balanceOfToken ?? '')
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
        setSuccessOpen(true);
        setUserGet(new BN(0));
      } catch {
        setFailureOpen(true);
      } finally {
        window.onbeforeunload = () => null;
      }
    }
  });

  useDebounce(
    () => {
      if (!tokens[formik.values.currency]?.price) return;

      setUserGet(
        new BN(formik.values.userInvest).multipliedBy(
          tokens[formik.values.currency].price
        )
      );
    },
    100,
    [formik.values.userInvest, formik.values.currency, tokens]
  );

  const handleOpenWalletListModal = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setWalletsOpen(true);
    },
    []
  );

  const handleCloseTooltip = useCallback(() => {
    formik.setFieldError('userInvest', '');
  }, [formik]);

  return (
    <>
      <form
        className={clsx(classes.investing, props.className)}
        onSubmit={!account ? handleOpenWalletListModal : formik.handleSubmit}
      >
        <Tippy
          visible={Boolean(formik.errors.userInvest)}
          content={formik.errors.userInvest}
          className={classes.tooltip}
          maxWidth={200}
          offset={[0, 25]}
          onClickOutside={handleCloseTooltip}
        >
          <Input
            type="number"
            onChange={formik.handleChange}
            name="userInvest"
            label="You invest"
            error={Boolean(formik.errors.userInvest)}
            value={formik.values.userInvest}
            className={classes.input}
          />
        </Tippy>
        <Select
          label="Currency"
          value={formik.values.currency}
          className={classes.input}
          onChange={(value) => formik.setFieldValue('currency', value)}
        >
          {network &&
            Object.values(tokens).map(({ name }) => (
              <SelectOption key={name} value={name} label={name} />
            ))}
        </Select>
        <Input
          type="text"
          name="userGet"
          label="You get"
          value={`${userGet.isNaN() ? '0' : userGet.toFixed(2)} Bond`}
          readOnly
          className={classes.userGet}
        />
        <Button className={classes.button} type="submit">
          Buy
        </Button>
      </form>
      <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
        <InvestingSuccess
          onClick={() => setSuccessOpen(false)}
          purchased={userGet.isNaN() ? '0' : userGet.toFixed(2)}
        />
      </Modal>
      <Modal open={failureOpen} onClose={() => setFailureOpen(false)}>
        <InvestingFailure onClick={() => formik.submitForm()} />
      </Modal>
      <WalletModal open={walletsOpen} onClose={() => setWalletsOpen(false)} />
    </>
  );
};
