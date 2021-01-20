import React, { useMemo } from 'react';
import BN from 'bignumber.js';

import { MainLayout } from 'src/layouts';
import {
  useNetworkConfig,
  PageWrapper,
  Typography,
  Skeleton
} from 'src/common';
import {
  StakingCard,
  useGovernanceCost,
  useStakingApy,
  useStakingBalances
} from 'src/staking/common';
import { STAKING_CONFIG } from 'src/staking-config';
import { useStakingListStyles } from './staking-list.styles';

export const StakingList: React.FC = () => {
  const networkConfig = useNetworkConfig();
  const classes = useStakingListStyles();
  const [stakingBalances] = useStakingBalances(STAKING_CONFIG);
  const stakingBalancesWithApy = useStakingApy(stakingBalances);
  const { governanceInUSDC } = useGovernanceCost();
  const normalizeGovernanceInUSDC = useMemo(
    () =>
      new BN(governanceInUSDC)
        .div(new BN(10).pow(networkConfig.assets.USDC.decimals))
        .toFixed(4),
    [governanceInUSDC, networkConfig.assets.USDC.decimals]
  );

  const rewardSum = stakingBalancesWithApy.reduce(
    (sum, { reward, rewardInUSDC }) => {
      return {
        reward: new BN(sum.reward).plus(reward).toFixed(6),
        rewardInUSDC: new BN(sum.rewardInUSDC).plus(rewardInUSDC).toString()
      };
    },
    { reward: '0', rewardInUSDC: '0' }
  );

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
                {normalizeGovernanceInUSDC} USD
              </Typography>
            </Typography>
            <Typography variant="body1" align="center">
              You earned:{' '}
              <Typography variant="inherit" component="span" weight="bold">
                {rewardSum.reward} BAG ({rewardSum.rewardInUSDC} USD)
              </Typography>
            </Typography>
          </div>
        </div>
        <div className={classes.staking}>
          {!stakingBalancesWithApy.length
            ? Array.from(Array(4), (_, i) => i).map((key) => (
                <Skeleton key={key} className={classes.skeleton} />
              ))
            : stakingBalancesWithApy.map((stakingBalance) => (
                <StakingCard
                  key={stakingBalance.key}
                  stacked={Boolean(Number(stakingBalance.amount))}
                  tokenKey={stakingBalance.key}
                  token={stakingBalance.token}
                  reward={stakingBalance.reward}
                  APY={stakingBalance.APY}
                />
              ))}
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
