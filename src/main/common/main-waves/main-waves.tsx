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
      <Typography variant="h4" align="center" className={classes.title}>
        BondAppetit works with the best projects in the industry. Discover our
        partners and collaborators.
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
