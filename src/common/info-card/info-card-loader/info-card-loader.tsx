import React from 'react';
import { useNProgress } from '@tanem/react-nprogress';

import { InfoCardWrapper } from '../info-card-wrapper';
import { useInfoCardLoaderStyles } from './info-card-loader.styles';

export type InfoCardLoaderProps = {
  isAnimating?: boolean;
};

export const InfoCardLoader: React.FC<InfoCardLoaderProps> = (props) => {
  const { isFinished, progress } = useNProgress({
    isAnimating: props.isAnimating
  });

  const classes = useInfoCardLoaderStyles({ isFinished });

  return (
    <InfoCardWrapper
      title={
        <>
          <div
            className={classes.process}
            style={{ width: `${progress * 100}%` }}
          />
          Transaction in progress
        </>
      }
    />
  );
};
