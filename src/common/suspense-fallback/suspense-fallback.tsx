import React from 'react';

import { ReactComponent as PageLoader } from 'src/assets/images/page-loader.svg';
import { useSuspenseFallbackStyles } from './suspense-fallback.styles';

export const SuspenseFallback: React.FC = () => {
  const classes = useSuspenseFallbackStyles();

  return (
    <div className={classes.root}>
      <PageLoader />
    </div>
  );
};
