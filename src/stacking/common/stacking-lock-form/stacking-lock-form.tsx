import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import { AbiItem } from 'web3-utils';
import BN from 'bignumber.js';
import { useMount } from 'react-use';

import type { Ierc20 } from 'src/generate/IERC20';
import {
  Input,
  Button,
  useStackingContract,
  useNetworkConfig,
  useDynamicContract,
  Typography,
  useBalance,
  Link,
  ButtonBase
} from 'src/common';
import { useStackingLockFormStyles } from './stacking-lock-form.styles';

export type StackingLockFormProps = {
  account?: string | null;
  tokenName: string;
  onSubmit?: () => void;
};

export const StackingLockForm: React.FC<StackingLockFormProps> = (props) => {
  const classes = useStackingLockFormStyles();

  const [balanceOfToken, setbalanceOfToken] = useState('');
  const networkConfig = useNetworkConfig();
  const stackingContract = useStackingContract();
  const getIERC20Contract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });
  const getBalance = useBalance();

  const { account, tokenName } = props;

  const handleGetBalanceOfToken = useCallback(async () => {
    if (!networkConfig) return;
    const currentAsset = networkConfig.assets[tokenName];

    const balanceOfTokenResult = await getBalance({
      tokenAddress: currentAsset.address
    });

    setbalanceOfToken(
      balanceOfTokenResult
        .div(new BN(10).pow(currentAsset.decimals))
        .toString(10)
    );
  }, [networkConfig, getBalance, tokenName]);

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (!formValues.amount) {
        error.amount = 'required';
      }

      if (!networkConfig) return;

      const currentAsset = networkConfig.assets[tokenName];

      if (new BN(balanceOfToken).isLessThan(formValues.amount)) {
        error.amount = `Looks like you don't have enough ${currentAsset.symbol}, please check your wallet`;
      }

      return error;
    },

    onSubmit: async (formValues, { resetForm }) => {
      if (!networkConfig || !account || !stackingContract) return;

      const currentAsset = networkConfig.assets[tokenName];

      const currentContract = getIERC20Contract(currentAsset.address);
      const formAmount = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentAsset.decimals))
        .toString();

      const approve = currentContract.methods.approve(
        stackingContract.options.address,
        formAmount
      );

      const allowance = await currentContract.methods
        .allowance(account, stackingContract.options.address)
        .call();

      if (allowance !== '0') {
        await currentContract.methods
          .approve(stackingContract.options.address, '0')
          .send({
            from: account,
            gas: await approve.estimateGas({ from: account })
          });
      }

      await approve.send({
        from: account,
        gas: await approve.estimateGas({ from: account })
      });

      await stackingContract?.methods
        .lock(currentAsset.address, formAmount)
        .send({
          from: account,
          gas: 2000000
        });
      resetForm();
      props.onSubmit?.();
    }
  });

  useMount(() => {
    handleGetBalanceOfToken();
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root}>
      <div>
        <Typography variant="body1" align="center">
          Stake your {props.tokenName}
        </Typography>
        <Input
          type="number"
          value={formik.values.amount || 0}
          name="amount"
          onChange={formik.handleChange}
          error={Boolean(formik.errors.amount)}
          className={classes.input}
        />
        <Typography variant="body1" align="center" className={classes.max}>
          <ButtonBase
            className={classes.maxButton}
            onClick={() => formik.setFieldValue('amount', balanceOfToken || 0)}
          >
            {balanceOfToken || 0} max
          </ButtonBase>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={classes.uniswapLink}
        >
          acquire more{' '}
          <Link href="#here" color="blue">
            here
          </Link>
        </Typography>
      </div>
      <Button>Stake</Button>
    </form>
  );
};
