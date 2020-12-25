import React from 'react';

import { MainLayout } from 'src/layouts';
import { Link, PageWrapper, Typography, Skeleton } from 'src/common';
import {
  StackingCard,
  useStackingApy,
  useStackingBalances
} from 'src/stacking/common';
import { useStackingListStyles } from './stacking-list.styles';

const AVAILABLE_TOKENS = ['ABT', 'Bond'];

export const StackingList: React.FC = () => {
  const classes = useStackingListStyles();
  const [stackingBalances] = useStackingBalances(AVAILABLE_TOKENS);
  const stackingBalancesWithApy = useStackingApy(stackingBalances);

  return (
    <MainLayout>
      <PageWrapper>
        <div className={classes.header}>
          <Typography variant="h2" align="center" className={classes.title}>
            Earn Staking Rewards in USDp by locking your assets for a certain
            period of time and providing liquidity for protocol’s assets
          </Typography>
          <div className={classes.links}>
            <Link color="blue" href="#details">
              <Typography component="span" variant="h4">
                How staking works in details ↗
              </Typography>
            </Link>
            <Link color="blue" href="#evaluate">
              <Typography component="span" variant="h4">
                Evaluate your appetit ↓
              </Typography>
            </Link>
          </div>
        </div>
        <div className={classes.staking}>
          {!stackingBalancesWithApy.length
            ? Array.from(Array(4), (_, i) => i).map((key) => (
                <Skeleton key={key} className={classes.skeleton} />
              ))
            : stackingBalancesWithApy.map((stackingBalance) => (
                <StackingCard
                  key={stackingBalance.name}
                  tokenKey={stackingBalance.key}
                  tokenName={stackingBalance.name}
                  reward={stackingBalance.reward}
                  delta={stackingBalance.delta}
                  APY={stackingBalance.APY}
                />
              ))}
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
