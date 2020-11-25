import React, { useCallback } from 'react';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import BN from 'bignumber.js';
import { useDebounce } from 'react-use';

import { useBuyTokenFormStyles } from './buy-token-form.styles';
import { Network } from '../create-use-contract';
import { Token } from '../types';
import { Input } from '../input';
import { Button } from '../button';
import { Select, SelectOption } from '../select';

export type BuyTokenFormProps = {
  className?: string;
  account?: string | null;
  tokens: Record<string, Token>;
  network?: Network;
  handleOpenWalletListModal: (event: React.FormEvent<HTMLFormElement>) => void;
  tokenName?: string;
  setUserGet: React.Dispatch<React.SetStateAction<BN>>;
  userGet: BN;
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
    network,
    handleOpenWalletListModal,
    tokenName = 'Bond',
    setUserGet,
    userGet,
    amountLabel = 'You invest'
  } = props;

  useDebounce(
    () => {
      if (!tokens[formik.values.currency]?.price) return;

      setUserGet(
        new BN(formik.values.amount).multipliedBy(
          tokens[formik.values.currency].price
        )
      );
    },
    100,
    [formik.values.amount, formik.values.currency, tokens]
  );

  const classNames = clsx(classes.investing, props.className, {
    [classes.disabled]: props.disabled
  });

  const handleCloseTooltip = useCallback(() => {
    formik.setFieldError('amount', '');
    formik.setFieldError('amountOfToken', '');
  }, [formik]);

  return (
    <form
      className={classNames}
      onSubmit={
        !props.account ? handleOpenWalletListModal : formik.handleSubmit
      }
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
        {network &&
          Object.values(tokens).map(({ name }) => (
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
        <Input
          type="text"
          name="userGet"
          label={`You get(${tokenName})`}
          value={`${userGet.isNaN() ? '0' : userGet.toFixed(2)}`}
          readOnly
          className={classes.userGet}
        />
      </Tippy>
      <Button className={classes.button} type="submit">
        Buy
      </Button>
    </form>
  );
};
