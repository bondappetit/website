import React from 'react';
import clsx from 'clsx';

import { useButtonBaseStyles } from './button-base.styles';

export type ButtonBaseProps = React.ComponentProps<'button'> & {
  component?: React.ElementType;
  to?: string;
  href?: string;
  target?: string;
  ref?:
    | ((instance: HTMLButtonElement | null) => void)
    | React.MutableRefObject<HTMLButtonElement | null>
    | null;
};

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props, ref) => {
    const classes = useButtonBaseStyles();

    const { component = 'button', className, children, ...restOfProps } = props;

    const Component: React.ElementType = component;

    const classNames = clsx(classes.baseButton, className, {
      [classes.disabled]: props.disabled
    });

    return (
      <Component ref={ref} className={classNames} {...restOfProps}>
        {children}
      </Component>
    );
  }
);

ButtonBase.displayName = 'ButtonBase';
