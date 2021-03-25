import React, { useCallback } from 'react';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { useDebounce, useMedia } from 'react-use';

import { BN, humanizeNumeral } from '../bignumber';
import { useBuyTokenFormStyles } from './buy-token-form.styles';
import { Network } from '../create-use-contract';
import { Token } from '../types';
import { Input } from '../input';
import { Button } from '../button';
import { Select, SelectOption } from '../select';
import { Typography } from '../typography';

export type BuyTokenFormProps = {
  className?: string;
  account?: string | null;
  tokens: Record<string, Token>;
  network?: Network;
  onWalletOpen: () => void;
  tokenName?: string;
  onAmountChange: (value: BN) => void;
  result: BN;
  disabled?: boolean;
  amountLabel?: string;
};

export type BuyTokenFormValues = {
  currency: string;
  amount: string;
  amountOfToken?: string;
};

export const BuyTokenForm: React.FC<BuyTokenFormProps> = (props) => {
  const classes = useBuyTokenFormStyles();

  const formik = useFormikContext<BuyTokenFormValues>();

  const {
    tokens,
    onWalletOpen,
    tokenName = 'BAG',
    onAmountChange,
    result,
    amountLabel = 'You invest'
  } = props;

  useDebounce(
    () => {
      if (!tokens[formik.values.currency]?.price) return;

      onAmountChange(
        new BN(formik.values.amount).multipliedBy(
          tokens[formik.values.currency].price
        )
      );
    },
    100,
    [formik.values.amount, formik.values.currency, tokens]
  );

  const handleCloseTooltip = useCallback(() => {
    formik.setFieldError('amount', '');
    formik.setFieldError('amountOfToken', '');
  }, [formik]);

  const isMobile = useMedia('(max-width: 959px)');

  const handleOpenWalletList = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      onWalletOpen();
    },
    [onWalletOpen]
  );

  return (
    <div className={clsx(classes.root, props.className)}>
      <form
        className={clsx(classes.investing, {
          [classes.disabled]: props.disabled
        })}
        onSubmit={!props.account ? handleOpenWalletList : formik.handleSubmit}
      >
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
            onChange={formik.handleChange}
            name="amount"
            label={amountLabel}
            min="0"
            error={Boolean(formik.errors.amount)}
            value={formik.values.amount}
            className={classes.input}
          />
        </Tippy>
        <Select
          label="Currency"
          value={formik.values.currency}
          className={classes.input}
          onChange={(value) => formik.setFieldValue('currency', value)}
        >
          {Object.values(tokens).map(({ name }) => (
            <SelectOption key={name} value={name} label={name} />
          ))}
        </Select>
        <Tippy
          visible={Boolean(formik.errors.amountOfToken)}
          content={formik.errors.amountOfToken}
          className={classes.tooltip}
          maxWidth={200}
          offset={[0, 25]}
          onClickOutside={handleCloseTooltip}
        >
          <>
            {isMobile && (
              <Typography
                variant="body1"
                className={classes.result}
                align="center"
              >
                You will get {humanizeNumeral(result)} BAG
              </Typography>
            )}
            {!isMobile && (
              <Input
                type="text"
                name="result"
                label={`You get(${tokenName})`}
                value={humanizeNumeral(result)}
                readOnly
                className={classes.result}
              />
            )}
          </>
        </Tippy>
        <Button className={classes.button} type="submit">
          Buy
        </Button>
      </form>
    </div>
  );
};
