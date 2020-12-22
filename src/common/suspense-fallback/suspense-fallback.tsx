import React from 'react';

import { Loader } from '../loader';
import { useSuspenseFallbackStyles } from './suspense-fallback.styles';

export const SuspenseFallback: React.FC = () => {
  const classes = useSuspenseFallbackStyles();

  return (
    <div className={classes.root}>
      <Loader />
    </div>
  );
};
