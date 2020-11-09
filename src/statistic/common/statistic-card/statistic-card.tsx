import clsx from 'clsx';
import React from 'react';

import { Plate } from 'src/common';
import { useStatisticCardStyles } from './statistic-card.styles';

export type StatisticCardProps = {
  className?: string;
};

export const StatisticCard: React.FC<StatisticCardProps> = (props) => {
  const classes = useStatisticCardStyles();

  return (
    <Plate className={clsx(classes.card, props.className)}>
      {props.children}
    </Plate>
  );
};
