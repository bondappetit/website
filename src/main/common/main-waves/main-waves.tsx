import React from 'react';

import { Typography } from 'src/common';
import { useMainWavesStyles } from './main-waves.styles';
import { WAVES_CARDS } from '../constants';
import { MainWavesCard } from '../main-waves-card';

export type MainWavesProps = {
  className?: string;
  onBecomePartner: () => void;
};

export const MainWaves: React.VFC<MainWavesProps> = (props) => {
  const classes = useMainWavesStyles();

  return (
    <div className={props.className}>
      <Typography variant="h2" className={classes.title}>
        BondAppetit works with the best in the industry
      </Typography>
      <div className={classes.list}>
        {WAVES_CARDS.map((card) => {
          const { onClick, ...restOfCard } = card;

          return (
            <MainWavesCard
              key={card.title}
              {...restOfCard}
              onClick={onClick ? props.onBecomePartner : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};
