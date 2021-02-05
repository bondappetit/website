import React from 'react';

import { Plate, Typography } from 'src/common';
import { useStakingInfoStyles } from './staking-info.styles';

const STAKING_CARDS = [
  {
    title: 'All',
    body: 'BondAppétit governance tokens will be distributed in 2 years.',
    date: '2021 — 2023'
  },
  {
    title: '10%',
    body: `of all governance tokens reserved for protocol usage will be distributed as staking reward for Phase 1 investors only during 6 month.`,
    date: '15 February 2021 — 15 July 2021'
  },
  {
    title: '90%',
    body: `of all governance tokens reserved for protocol usage will be distributed as staking reward in Phase 2 and 3.`,
    date: '15 April 2021 - 15 February 2023'
  }
];

export const StakingInfo: React.FC = () => {
  const classes = useStakingInfoStyles();

  return (
    <Plate withoutBorder color="grey" className={classes.root}>
      {STAKING_CARDS.map((card) => (
        <div className={classes.card} key={card.title}>
          <Typography variant="h1" component="h2" className={classes.cardTitle}>
            {card.title}
          </Typography>
          <Typography variant="h5" className={classes.cardBody}>
            {card.body}
          </Typography>
          <Typography variant="body1" className={classes.cardDate}>
            {card.date}
          </Typography>
        </div>
      ))}
    </Plate>
  );
};
