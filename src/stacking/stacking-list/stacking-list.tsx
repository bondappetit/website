import React from 'react';
import BN from 'bignumber.js';

import { MainLayout } from 'src/layouts';
import { PageWrapper, Typography, Skeleton } from 'src/common';
import {
  StackingCard,
  useGovernanceCost,
  useStackingApy,
  useStackingBalances
} from 'src/stacking/common';
import { useStackingListStyles } from './stacking-list.styles';
import { useEarned } from './use-earned';

const AVAILABLE_TOKENS = ['Governance', 'Stable'];

export const StackingList: React.FC = () => {
  const classes = useStackingListStyles();
  const [stackingBalances] = useStackingBalances(AVAILABLE_TOKENS);
  const stackingBalancesWithApy = useStackingApy(stackingBalances);
  const { governanceInUSDC } = useGovernanceCost();
  const earned = useEarned();

  return (
    <MainLayout>
      <PageWrapper>
        <div className={classes.header}>
          <Typography variant="h2" align="center" className={classes.title}>
            Earn Staking Rewards in USDp by locking your assets for a certain
            period of time and providing liquidity for protocol’s assets
          </Typography>
          <div className={classes.info}>
            <Typography variant="body1" align="center" className={classes.bag}>
              BAG price:{' '}
              <Typography variant="inherit" component="span" weight="bold">
                {governanceInUSDC} USD
              </Typography>
            </Typography>
            <Typography variant="body1" align="center">
              You earned:{' '}
              <Typography variant="inherit" component="span" weight="bold">
                {earned} BAG (
                {new BN(earned).div(governanceInUSDC).toString(10)} USD)
              </Typography>
            </Typography>
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
                  APY={stackingBalance.APY}
                />
              ))}
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
