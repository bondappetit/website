import React, { useMemo } from 'react';

import { MainLayout } from 'src/layouts';
import {
  useNetworkConfig,
  PageWrapper,
  Typography,
  Head,
  BN,
  Plate,
  humanizeNumeral
} from 'src/common';
import {
  StakingCard,
  StakingInfo,
  useGovernanceCost,
  useStakingApy,
  useStakingBalances,
  useTotalValueLocked
} from 'src/staking/common';
import { config } from 'src/config';
import { useStakingConfig } from 'src/staking-config';
import { useStakingListStyles } from './staking-list.styles';

export const StakingList: React.FC = () => {
  const networkConfig = useNetworkConfig();
  const classes = useStakingListStyles();

  const stakingConfig = useStakingConfig();

  const stakingConfigValues = useMemo(() => Object.values(stakingConfig), [
    stakingConfig
  ]);

  const [stakingBalances] = useStakingBalances(stakingConfigValues);
  const stakingBalancesWithApy = useStakingApy(stakingBalances);
  const { governanceInUSDC } = useGovernanceCost();
  const normalizeGovernanceInUSDC = useMemo(
    () =>
      new BN(governanceInUSDC)
        .div(new BN(10).pow(networkConfig.assets.USDC.decimals))
        .toFormat(2),
    [governanceInUSDC, networkConfig.assets.USDC.decimals]
  );

  const rewardSum = useMemo(
    () =>
      stakingBalancesWithApy.reduce(
        (sum, { reward, rewardInUSDC }) => {
          return {
            reward: new BN(sum.reward).plus(reward).toFormat(2),
            rewardInUSDC: new BN(sum.rewardInUSDC).plus(rewardInUSDC).toFormat()
          };
        },
        { reward: '0', rewardInUSDC: '0' }
      ),
    [stakingBalancesWithApy]
  );

  const totalValueLocked = useTotalValueLocked(stakingBalancesWithApy);

  return (
    <>
      <Head title="Earn Staking Rewards in BAG by providing liquidity for protocol’s assets" />
      <MainLayout>
        <PageWrapper>
          <div className={classes.header}>
            <Typography variant="h1" align="center" className={classes.title}>
              Earn Staking Rewards in BAG by providing liquidity for protocol’s
              assets
            </Typography>
            <Plate color="grey" withoutBorder className={classes.info}>
              <Typography variant="h5" align="center" className={classes.bag}>
                Total value locked:{' '}
                <Typography variant="inherit" component="span" weight="bold">
                  ${humanizeNumeral(totalValueLocked)}
                </Typography>
              </Typography>
              <Typography variant="h5" align="center" className={classes.bag}>
                BAG price:{' '}
                <Typography variant="inherit" component="span" weight="bold">
                  ${humanizeNumeral(normalizeGovernanceInUSDC)}
                </Typography>
              </Typography>
              <Typography variant="h5" align="center">
                You earned:{' '}
                <Typography variant="inherit" component="span" weight="bold">
                  {humanizeNumeral(rewardSum.reward)} BAG
                </Typography>
                {rewardSum.rewardInUSDC !== '0' && (
                  <>(${humanizeNumeral(rewardSum.rewardInUSDC)})</>
                )}
              </Typography>
            </Plate>
          </div>
          <div className={classes.staking}>
            {!stakingBalancesWithApy.length
              ? Array.from(
                  Array(stakingConfigValues.length),
                  (_, i) => i
                ).map((key) => (
                  <StakingCard
                    key={key}
                    loading={!stakingBalancesWithApy.length}
                  />
                ))
              : stakingBalancesWithApy.map((stakingBalance) => (
                  <StakingCard
                    key={stakingBalance.key}
                    stacked={Boolean(Number(stakingBalance.amount))}
                    token={stakingBalance.token}
                    reward={stakingBalance.reward}
                    totalSupply={stakingBalance.totalSupply}
                    poolRate={stakingBalance.poolRate}
                    lockable={stakingBalance.lockable}
                    stakingContractAddress={
                      stakingBalance.stakingContract.options.address
                    }
                    APY={stakingBalance.APY}
                  />
                ))}
          </div>
          {!config.IS_COLLATERAL && <StakingInfo />}
        </PageWrapper>
      </MainLayout>
    </>
  );
};
