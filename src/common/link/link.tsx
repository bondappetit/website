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
  underline?: 'always' | 'hover' | 'none';
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const classes = useLinkStyles();

    const { component, underline = 'none', className, ...restOfProps } = props;

    const Component = component ?? 'a';

    const classNames = clsx(classes.link, className, classes[underline]);

    return (
      <Component ref={ref} className={classNames} {...restOfProps}>
        {props.children}
      </Component>
    );
  }
);

Link.displayName = 'Link';
