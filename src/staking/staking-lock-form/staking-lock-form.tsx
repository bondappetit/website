import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import type { AbiItem } from 'web3-utils';
import BN from 'bignumber.js';
import Tippy from '@tippyjs/react';
import { useToggle } from 'react-use';

import type { Ierc20 } from 'src/generate/IERC20';
import {
  Input,
  Button,
  useDynamicContract,
  Typography,
  ButtonBase,
  LinkIfAccount
} from 'src/common';
import { StakingAcquireModal, useStakingContracts } from '../common';
import { useStakingLockFormStyles } from './staking-lock-form.styles';

export type StakingLockFormProps = {
  account?: string | null;
  tokenKey: string;
  tokenName?: string;
  tokenAddress?: string;
  contractName?: string;
  tokenDecimals?: string;
  onSubmit?: () => void;
  balanceOfToken: string;
};

const DEFAULT_GAS = 2000000;

export const StakingLockForm: React.FC<StakingLockFormProps> = (props) => {
  const classes = useStakingLockFormStyles();

  const [aquireOpen, aquireToggle] = useToggle(false);

  const getStakingContract = useStakingContracts();
  const getIERC20Contract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const { account, tokenAddress, contractName, tokenDecimals } = props;

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Required';
      }

      if (new BN(props.balanceOfToken).isLessThan(formValues.amount)) {
        error.amount = `Looks like you don't have enough ${props.tokenName}, please check your wallet`;
      }

      return error;
    },

    onSubmit: async (formValues, { resetForm }) => {
      if (!account || !contractName || !tokenDecimals) return;

      const currentAssetContract = getIERC20Contract(tokenAddress);

      const formAmount = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(tokenDecimals))
        .toString(10);

      const stakingContract = getStakingContract(contractName);

      const approve = currentAssetContract.methods.approve(
        stakingContract.options.address,
        formAmount
      );

      const allowance = await currentAssetContract.methods
        .allowance(account, stakingContract.options.address)
        .call();

      if (allowance !== '0') {
        await currentAssetContract.methods
          .approve(stakingContract.options.address, '0')
          .send({
            from: account,
            gas: await approve.estimateGas({ from: account })
          });
      }

      await approve.send({
        from: account,
        gas: await approve.estimateGas({ from: account })
      });

      await stakingContract.methods.stake(formAmount).send({
        from: account,
        gas: DEFAULT_GAS
      });
      resetForm();
      props.onSubmit?.();
    }
  });

  const handleCloseTooltip = useCallback(() => {
    formik.setFieldError('amount', '');
  }, [formik]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.root}>
        <div>
          <Typography variant="body1" align="center" className={classes.title}>
            Stake your{' '}
            <LinkIfAccount title={props.tokenName}>
              {props.tokenAddress ?? ''}
            </LinkIfAccount>
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
              placeholder="0"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.amount)}
              className={classes.input}
            />
          </Tippy>
          <Typography variant="body1" align="center" className={classes.max}>
            <ButtonBase
              className={classes.link}
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
            How to{' '}
            <ButtonBase
              type="button"
              color="blue"
              onClick={aquireToggle}
              className={classes.link}
            >
              acquire
            </ButtonBase>
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
      <StakingAcquireModal
        open={aquireOpen}
        onClose={aquireToggle}
        tokenName={props.tokenName}
      />
    </>
  );
};
