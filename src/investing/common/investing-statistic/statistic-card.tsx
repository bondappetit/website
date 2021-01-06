import clsx from 'clsx';
import React from 'react';

import { Plate } from 'src/common';
import { useInvestingStatisticStyles } from './statistic.styles';

export type StatisticCardProps = {
  className?: string;
};

export const StatisticCard: React.FC<StatisticCardProps> = (props) => {
  const classes = useInvestingStatisticStyles();

  return (
    <Plate className={clsx(classes.card, props.className)}>
      {props.children}
    </Plate>
  );
};
