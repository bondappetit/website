import React from 'react';
import { useNProgress } from '@tanem/react-nprogress';

import { InfoCardWrapper } from '../info-card-wrapper';
import { useInfoCardLoaderStyles } from './info-card-loader.styles';

export type InfoCardLoaderProps = {
  isAnimating?: boolean;
};

export const InfoCardLoader: React.FC<InfoCardLoaderProps> = (props) => {
  const classes = useInfoCardLoaderStyles();

  const { isFinished, progress } = useNProgress({
    isAnimating: props.isAnimating
  });

  const dots = ['.', '..', '...'];

  return (
    <InfoCardWrapper
      title={
        <span className={classes.heading}>
          Transaction in progress
          <span className={classes.dots}>
            {!isFinished && dots[Math.floor(progress * 100) % dots.length]}
          </span>
        </span>
      }
    />
  );
};
