import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { useLoaderStyles } from './loader.styles';

export type LoaderProps = {
  width?: number;
  height?: number;
  className?: string;
};

export const Loader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { width = 80, height = 80 } = props;

  const classes = useLoaderStyles({ width, height });

  return (
    <div className={clsx(classes.root, props.className)} ref={ref}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
});

Loader.displayName = 'Loader';
