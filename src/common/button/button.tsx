import React from 'react';
import clsx from 'clsx';

import { ButtonBase, ButtonBaseProps } from '../button-base';
import { Loader } from '../loader';
import { useButtonStyles } from './button.styles';

export type ButtonProps = ButtonBaseProps & {
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, loading, ...props }, ref) => {
    const classes = useButtonStyles();

    const classNames = clsx(
      classes.button,
      className,
      classes[props.variant ?? 'contained'],
      classes[props.color ?? 'primary']
    );

    return (
      <ButtonBase className={classNames} ref={ref} {...props}>
        {loading && <Loader width={45} height={45} strokeWidth={5} />}
        {!loading && children}
      </ButtonBase>
    );
  }
);

Button.displayName = 'Button';
