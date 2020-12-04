import React from 'react';
import clsx from 'clsx';

import { useStatusStyles } from './status.styles';
import { Typography } from '../typography';

export type StatusProps = {
  className?: string;
  color: 'grey' | 'blue' | 'red' | 'yellow' | 'green' | 'pink';
};

export const Status: React.FC<StatusProps> = (props) => {
  const classes = useStatusStyles();

  return (
    <Typography
      variant="h5"
      component="div"
      className={clsx(classes.root, classes[props.color], props.className)}
    >
      {props.children}
    </Typography>
  );
};
