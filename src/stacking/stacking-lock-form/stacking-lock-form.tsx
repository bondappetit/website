import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import { AbiItem } from 'web3-utils';
import BN from 'bignumber.js';
import Tippy from '@tippyjs/react';

import type { Ierc20 } from 'src/generate/IERC20';
import {
  Input,
  Button,
  useNetworkConfig,
  useDynamicContract,
  Typography,
  Link,
  ButtonBase
} from 'src/common';
import { useStackingContracts } from '../common';
import { useStackingLockFormStyles } from './stacking-lock-form.styles';

export type StackingLockFormProps = {
  account?: string | null;
  tokenName: string | null;
  tokenKey: string;
  onSubmit?: () => void;
  balanceOfToken: string;
};

export const StackingLockForm: React.FC<StackingLockFormProps> = (props) => {
  const classes = useStackingLockFormStyles();

  const networkConfig = useNetworkConfig();
  const getStackingContract = useStackingContracts();
  const getIERC20Contract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const { account, tokenKey } = props;

  const formik = useFormik({
    initialValues: {
      amount: '0'
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Required';
      }

      const currentAsset = networkConfig.assets[tokenKey];

      if (new BN(props.balanceOfToken).isLessThan(formValues.amount)) {
        error.amount = `Looks like you don't have enough ${currentAsset.symbol}, please check your wallet`;
      }

      return error;
    },

    onSubmit: async (formValues, { resetForm }) => {
      if (!account) return;

      const currentAsset = networkConfig.assets[tokenKey];

      const currentContract = getIERC20Contract(currentAsset.address);

      const formAmount = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentAsset.decimals))
        .toString(10);

      const stackingContract = getStackingContract(tokenKey);

      if (!stackingContract) return;

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

      await stackingContract.methods.stake(formAmount).send({
        from: account,
        gas: 2000000
      });
      resetForm();
      props.onSubmit?.();
    }
  });

  const handleCloseTooltip = useCallback(() => {
    formik.setFieldError('amount', '');
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root}>
      <div>
        <Typography variant="body1" align="center">
          Stake your {props.tokenName}
        </Typography>
        <Tippy
          visible={Boolean(formik.errors.amount)}
          content={formik.errors.amount}
          className={classes.tooltip}
          maxWidth={200}
          offset={[0, 25]}
          onClickOutside={handleCloseTooltip}
        >
          <Input
            type="number"
            value={formik.values.amount}
            name="amount"
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.amount)}
            className={classes.input}
          />
        </Tippy>
        <Typography variant="body1" align="center" className={classes.max}>
          <ButtonBase
            className={classes.maxButton}
            type="button"
            disabled={formik.isSubmitting}
            onClick={() =>
              formik.setFieldValue('amount', props.balanceOfToken || 0)
            }
          >
            {props.balanceOfToken || 0} max
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
      <Button
        type="submit"
        disabled={formik.isSubmitting}
        loading={formik.isSubmitting}
      >
        Stake
      </Button>
    </form>
  );
};