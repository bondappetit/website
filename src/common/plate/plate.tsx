import clsx from 'clsx';
import React from 'react';

import { usePlateStyles } from './plate.styles';

export type PlateProps = React.HTMLProps<HTMLDivElement>;

export const Plate = React.forwardRef<HTMLDivElement, PlateProps>(
  (props, ref) => {
    const classes = usePlateStyles();
    const { children, className, ...restOfProps } = props;

    return (
      <div
        {...restOfProps}
        className={clsx(classes.plate, className)}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Plate.displayName = 'Plate';
