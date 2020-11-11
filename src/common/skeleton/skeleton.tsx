import React from 'react';
import clsx from 'clsx';

import { useSkeletonStyles } from './skeleton.styles';

export type SkeletonProps = {
  component?: React.ElementType;
  animation?: 'pulse' | 'wave';
  className?: string;
  height?: number | string;
  width?: number | string;
  variant?: 'text' | 'rectangular' | 'circular';
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: object;
  ref?:
    | ((instance: React.ElementType | null) => void)
    | React.MutableRefObject<React.ElementType | null>
    | null;
};

export const Skeleton = React.forwardRef<React.ElementType, SkeletonProps>(
  (props, ref) => {
    const {
      animation = 'pulse',
      className,
      component: Component = 'span',
      height,
      style,
      variant = 'text',
      width,
      ...restOfProps
    } = props;

    const classes = useSkeletonStyles();

    const hasChildren = Boolean(restOfProps.children);

    const classNames = clsx(
      classes.root,
      classes[variant],
      {
        [classes[animation]]: Boolean(animation),
        [classes.withChildren]: hasChildren,
        [classes.fitContent]: hasChildren && !width,
        [classes.heightAuto]: hasChildren && !height
      },
      className
    );

    return (
      <Component
        ref={ref}
        className={classNames}
        {...restOfProps}
        style={{
          width,
          height,
          ...style
        }}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
