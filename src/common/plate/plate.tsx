import clsx from 'clsx';
import React from 'react';

import { usePlateStyles } from './plate.styles';

export type PlateProps = React.HTMLProps<HTMLDivElement> & {
  component?: React.ElementType;
};

export const Plate = React.forwardRef<HTMLDivElement, PlateProps>(
  (props, ref) => {
    const { children, className, component = 'div', ...restOfProps } = props;
    const classes = usePlateStyles();

    const Component = component;

    return (
      <Component
        {...restOfProps}
        className={clsx(classes.plate, className)}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Plate.displayName = 'Plate';
