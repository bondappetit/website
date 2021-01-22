import React from 'react';
import { useNProgress } from '@tanem/react-nprogress';

import { ReactComponent as HatOutlineIcon } from 'src/assets/icons/hat-outline.svg';
import { Typography } from 'src/common/typography';
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
          <HatOutlineIcon />
        </span>
      }
    >
      <Typography variant="h3">
        Processing
        <span className={classes.dots}>
          {!isFinished && dots[Math.floor(progress * 100) % dots.length]}
        </span>
      </Typography>
    </InfoCardWrapper>
  );
};
