import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { useInvestingStatisticStyles } from './statistic.styles';

export type InvestingStatisticProps = {
  className?: string;
  id?: string;
};

export const InvestingStatistic: React.FC<InvestingStatisticProps> = (
  props
) => {
  const classes = useInvestingStatisticStyles();

  return (
    <div className={clsx(props.className)} id={props.id}>
      <Typography
        variant="h3"
        weight="light"
        align="center"
        className={classes.title}
      >
        Right now, BondAppétit is undergoing the external security audit
      </Typography>
    </div>
  );
};
