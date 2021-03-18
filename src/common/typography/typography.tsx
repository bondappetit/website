import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { useTypographyStyles } from './typography.styles';

type Variants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'inherit';

type TagNames = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

const variantMapping: Record<Variants, TagNames> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'span'
};

export type TypographyProps = {
  variant: Variants;
  className?: string;
  weight?: 'bold' | 'normal' | 'light';
  align?: 'left' | 'center' | 'right';
  component?: TagNames | 'span' | 'div';
  ref?:
    | ((instance: HTMLHeadingElement | null) => void)
    | React.MutableRefObject<HTMLHeadingElement | null>
    | null;
  children?: React.ReactNode;
};

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  (props, ref) => {
    const classes = useTypographyStyles();

    const classNames = clsx(
      classes.root,
      props.className,
      classes[props.variant],
      classes[props.weight ?? 'normal'],
      classes[props.align ?? 'left']
    );

    const Component = props.component ?? variantMapping[props.variant];

    return (
      <Component className={classNames} ref={ref}>
        {props.children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
