import clsx from 'clsx';
import React from 'react';

import { useLinkStyles } from './link.styles';

export type LinkProps = {
  component?: React.ElementType;
  to?: string;
  href?: string;
  target?: string;
  children?: React.ReactNode;
  className?: string;
  rel?: string;
  underline?: 'always' | 'hover' | 'none';
  color?: 'blue' | 'primary';
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const classes = useLinkStyles();

    const {
      component = 'a',
      underline = 'none',
      className,
      color = 'primary',
      ...restOfProps
    } = props;

    const Component = component;

    const classNames = clsx(
      classes.link,
      className,
      classes[underline],
      classes[color]
    );

    return (
      <Component ref={ref} className={classNames} {...restOfProps}>
        {props.children}
      </Component>
    );
  }
);

Link.displayName = 'Link';
