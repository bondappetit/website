import { useFormikContext } from 'formik';
import React from 'react';

import { BN, Button, ButtonBase, Input, Typography } from 'src/common';
import { ReactComponent as QuestionIcon } from 'src/assets/icons/question.svg';
import { useBridgeFormStyles } from './binance-form.styles';

export type BridgeFormProps = {
  balance?: BN;
  approve?: boolean;
  reset?: boolean;
};

export const BridgeForm: React.VFC<BridgeFormProps> = (props) => {
  const formik = useFormikContext<{ amount: string }>();

  const classes = useBridgeFormStyles();

  const balance = props.balance?.toString(10) ?? '0';

  return (
    <form className={classes.root} noValidate onSubmit={formik.handleSubmit}>
      <div>
        <Input
          placeholder="0"
          name="amount"
          type="number"
          className={classes.input}
          value={formik.values.amount}
          onChange={formik.handleChange}
        />
      </div>
      <ButtonBase
        type="button"
        className={classes.max}
        onClick={() => formik.setFieldValue('amount', balance)}
      >
        {balance} max
      </ButtonBase>
      <div className={classes.feeWrap}>
        <Typography variant="body1" className={classes.fee}>
          Total fee: 0.05 BNB + ETH GAS
        </Typography>
        <QuestionIcon />
      </div>
      <div>
        {(props.approve || props.reset) && (
          <Button
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
            className={classes.approve}
          >
            {formik.errors.amount || 'Approve'}
          </Button>
        )}
        <Button
          disabled={formik.isSubmitting || props.approve || props.reset}
          loading={formik.isSubmitting}
        >
          {formik.errors.amount || 'Transfer'}
        </Button>
      </div>
    </form>
  );
};
