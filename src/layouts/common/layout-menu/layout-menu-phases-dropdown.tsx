import clsx from 'clsx';
import React from 'react';
import { Typography } from 'src/common';

import { useLayoutMenuStyles } from './layout-menu.styles';

const PHASES = [
  {
    title: 'Phase 1: Protocol launch',
    body:
      'Stake stablecoins in early stage and earn more BAG as staking rewards',
    date: 'Up to 2 month, Started February 15'
  },
  {
    title: 'Phase 2: BAG investment round',
    body:
      'Invest in BondAppétit Governance and infuence the future of protocol',
    date: '1 month, starts in a day after P1'
  },
  {
    title: 'Phase 3: RWA-collateral',
    body: 'Invest in first real-world baked Stablecoin',
    date: '1 month, starts in a day after P2'
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
