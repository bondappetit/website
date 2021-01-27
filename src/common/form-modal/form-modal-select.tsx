import React from 'react';
import clsx from 'clsx';

import { ButtonBase } from '../button-base';
import { useFormModalStyles } from './form-modal.styles';
import { Asset } from '../types';

export type FormModalSelectProps = {
  onChange: (value: string, balance: string) => void;
  options: Asset[];
  value: string;
};

export const FormModalSelect: React.FC<FormModalSelectProps> = (props) => {
  const classes = useFormModalStyles();

  return (
    <div className={classes.select}>
      {props.options.map((option) => (
        <ButtonBase
          type="button"
          key={option.symbol}
          className={clsx(classes.selectOption, {
            [classes.selectOptionActive]: option.symbol === props.value
          })}
          onClick={() => props.onChange(option.symbol, option.balance)}
        >
          <span>{option.symbol}</span>
          <span>{option.balance}</span>
        </ButtonBase>
      ))}
    </div>
  );
};
