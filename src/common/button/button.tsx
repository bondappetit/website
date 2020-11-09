import React from 'react';
import clsx from 'clsx';

import { ButtonBase, ButtonBaseProps } from '../button-base';
import { useButtonStyles } from './button.styles';

export type ButtonProps = ButtonBaseProps & {
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const classes = useButtonStyles();

    const classNames = clsx(
      classes.button,
      className,
      classes[props.variant ?? 'contained'],
      classes[props.color ?? 'primary']
    );

    return <ButtonBase className={classNames} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';
