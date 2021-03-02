import clsx from 'clsx';
import React from 'react';
import { Typography } from 'src/common';

import { useLayoutMenuStyles } from './layout-menu.styles';

const PHASES = [
  {
    title: 'Phase 1: Protocol launch',
    body:
      'Stake stablecoins in early stage and earn more BAG as staking rewards',
    date: 'Up to 2 months, Started February 15'
  },
  {
    title: 'Phase 2: Invest in BondAppétit',
    body: 'Offering of BAG on the open market to purchase RWA assets',
    date: '1 month, starts in a day after P1'
  },
  {
    title: 'Phase 3: RWA-collateral',
    body:
      'Purchase the first-ever decentralized stablecoin backed by real-world fixed-income securities',
    date: '1 month, starts in a day after P2'
  },
  {
    title: 'Phase 4: Direct Investment',
    body:
      'Protocol’s capitalization - $100M. No more BAG tokens will be issued to the open market',
    date: 'in 2 years'
  }
];

export const LayoutMenuPhasesDropdown: React.FC = () => {
  const classes = useLayoutMenuStyles();

  return (
    <ul className={clsx(classes.dropdown, classes.dropdownPhases)}>
      {PHASES.map((phase) => (
        <li key={phase.title} className={classes.dropdownPhasesItem}>
          <Typography variant="body1" weight="bold">
            {phase.title}
          </Typography>
          <Typography variant="body1">{phase.body}</Typography>
          <Typography
            variant="body1"
            className={classes.dropdownPhasesItemDate}
          >
            {phase.date}
          </Typography>
        </li>
      ))}
    </ul>
  );
};
