import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { StatisticCard } from './statistic-card';
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
        Right now, BondAppétit is conducting the pre-sale round of{' '}
        <Typography variant="inherit" weight="bold">
          BondAppétit Governance (BAG)
        </Typography>{' '}
        — the main tool for decision-making in BondAppétit protocol, as well as
        the main reward and incentive tool for participants of the protocol and
        the community.
      </Typography>
      <div className={classes.row}>
        <StatisticCard>
          <Typography
            variant="h1"
            component="h2"
            weight="light"
            align="center"
            className={classes.count}
          >
            1,200,000
          </Typography>
          <Typography
            variant="h5"
            align="center"
            className={classes.cardSubtitle}
          >
            <Typography variant="inherit" weight="bold" align="center">
              Offered during the pre-sale round
            </Typography>{' '}
            12% of the overall issue (10 000 000) is offered to early investors,
            subject to a 1-year moratorium on sale
          </Typography>
        </StatisticCard>
        <StatisticCard>
          <Typography variant="h4" align="center" className={classes.rightCard}>
            <Typography variant="inherit" weight="bold">
              The funds
            </Typography>{' '}
            will be used to make first loans to borrowers who will bring the
            first bonds in the form of collateral to the protocol, giving an
            initial kick-off to the protocol’s economics.
          </Typography>
        </StatisticCard>
      </div>
    </div>
  );
};
