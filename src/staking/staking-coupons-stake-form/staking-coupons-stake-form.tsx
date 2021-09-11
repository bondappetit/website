import React from 'react';
import { useFormik } from 'formik';
import { useUpdateEffect } from 'react-use';

import {
  Typography,
  ButtonBase,
  NumericalInput,
  bignumberUtils
} from 'src/common';
import { WalletButtonWithFallback } from 'src/wallets';
import { useStakingCouponsStakeFormStyles } from './staking-coupons-stake-form.styles';

export type StakingCouponsStakeFormProps = {
  onSubmit?: (amount: string, fn: () => void) => Promise<void>;
  loading: boolean;
  stakingToken?: string;
  balance?: string;
  onChange: (amount: string) => void;
  buttonTitle: string;
};

export const StakingCouponsStakeForm: React.FC<StakingCouponsStakeFormProps> = (
  props
) => {
  const classes = useStakingCouponsStakeFormStyles();

  const { balance = '0' } = props;

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const errors: Partial<typeof formValues> = {};

      if (bignumberUtils.eq(formValues.amount, 0)) {
        errors.amount = 'Please enter amount';
      }

      if (bignumberUtils.lt(props.balance, formValues.amount)) {
        errors.amount = `Not enough ${props.stakingToken}`;
      }

      return errors;
    },

    onSubmit: async ({ amount }, { resetForm }) => {
      await props.onSubmit?.(amount, resetForm);
    }
  });

  const handleOnMax = () => {
    formik.setFieldValue('amount', balance);
  };

  useUpdateEffect(() => {
    props.onChange(formik.values.amount);
  }, [formik.values.amount]);

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root} noValidate>
      <div>
        <Typography variant="body1" align="center">
          Stake your {props.loading ? '...' : props.stakingToken}
        </Typography>
        <NumericalInput
          value={formik.values.amount}
          name="amount"
          placeholder="0"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.amount)}
          className={classes.input}
        />
        <Typography
          variant="body1"
          align="center"
          className={classes.max}
          component="div"
        >
          <ButtonBase
            className={classes.link}
            type="button"
            disabled={formik.isSubmitting}
            onClick={handleOnMax}
          >
            {props.loading ? '...' : balance} max
          </ButtonBase>
        </Typography>
      </div>
      <WalletButtonWithFallback
        className={classes.button}
        loading={formik.isSubmitting}
      >
        {formik.errors.amount || props.buttonTitle}
      </WalletButtonWithFallback>
    </form>
  );
};
