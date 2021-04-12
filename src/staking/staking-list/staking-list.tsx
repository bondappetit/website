import React, { useMemo } from 'react';

import { MainLayout } from 'src/layouts';
import {
  useNetworkConfig,
  PageWrapper,
  Typography,
  Head,
  BN,
  Plate,
  numberArray,
  humanizeNumeral
} from 'src/common';
import {
  StakingCard,
  StakingInfo,
  useGovernanceCost,
  StakingLabel
} from 'src/staking/common';
import { config } from 'src/config';
import { useStakingConfig, StakingConfig } from 'src/staking-config';
import { useStakingListStyles } from './staking-list.styles';
import { useStakingListQuery } from '../../graphql/_generated-hooks';

export const StakingList: React.VFC = () => {
  const networkConfig = useNetworkConfig();
  const classes = useStakingListStyles();

  const stakingConfig = useStakingConfig();

  const stakingConfigValues = useMemo(() => Object.values(stakingConfig), [
    stakingConfig
  ]);
  // const stakingBalancesWithApy = useStakingTokens(stakingConfigValues);
  const { governanceInUSDC } = useGovernanceCost();
  const normalizeGovernanceInUSDC = useMemo(() => {
    if (!governanceInUSDC) return new BN('0');

    return new BN(governanceInUSDC).div(
      new BN(10).pow(networkConfig.assets.USDC.decimals)
    );
  }, [governanceInUSDC, networkConfig.assets.USDC.decimals]);

  // const rewardSum = useMemo(
  //   () =>
  //     stakingBalancesWithApy.value?.reduce(
  //       (sum, { reward, rewardInUSDC }) => {
  //         return {
  //           reward: new BN(sum.reward).plus(reward),
  //           rewardInUSDC: new BN(sum.rewardInUSDC).plus(rewardInUSDC)
  //         };
  //       },
  //       { reward: new BN('0'), rewardInUSDC: new BN('0') }
  //     ),
  //   [stakingBalancesWithApy.value]
  // );

  // const volume24 = useMemo(
  //   () =>
  //     stakingBalancesWithApy.value?.reduce(
  //       (acc, { volumeUSD }) => acc.plus(volumeUSD),
  //       new BN(0)
  //     ),
  //   [stakingBalancesWithApy.value]
  // );

  const stakingListQuery = useStakingListQuery({
    variables: {
      filter: {
        address: Object.keys(stakingConfig)
      }
    }
    // pollInterval: config.POLLING_INTERVAL
  });

  const totalValueLocked = useMemo(() => {
    if (!stakingListQuery.data?.stakingList) return;

    return stakingListQuery.data?.stakingList.reduce(
      (acc, { totalSupplyFloat }) => acc.plus(totalSupplyFloat),
      new BN(0)
    );
  }, [stakingListQuery.data]);

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
              <StakingLabel
                className={classes.bag}
                title="Total value locked"
                loading={stakingListQuery.loading}
                value={<>${humanizeNumeral(totalValueLocked)}</>}
              />
              <StakingLabel
                className={classes.bag}
                title="BAG price"
                loading={stakingListQuery.loading || !normalizeGovernanceInUSDC}
                value={<>${humanizeNumeral(normalizeGovernanceInUSDC)}</>}
              />
              {/*
              <StakingLabel
                className={classes.bag}
                title="You earned"
                loading={stakingListQuery.loading}
                value={<>{humanizeNumeral(rewardSum?.reward)} BAG</>}
              >
                {rewardSum?.rewardInUSDC.isGreaterThan(0) &&
                  stakingBalancesWithApy.value && (
                    <> (${humanizeNumeral(rewardSum?.rewardInUSDC)})</>
                  )}
              </StakingLabel>
              <StakingLabel
                title="Volume (24h)"
                loading={stakingListQuery.loading}
                value={<>${humanizeNumeral(volume24)}</>}
              /> */}
            </Plate>
          </div>
          <div className={classes.staking}>
            {stakingListQuery.loading
              ? numberArray(stakingConfigValues.length).map((key) => (
                  <StakingCard key={key} loading={stakingListQuery.loading} />
                ))
              : stakingListQuery.data?.stakingList.map((stakingBalance) => {
                  const stakingConfigItem: StakingConfig =
                    stakingConfig[stakingBalance.address];

                  if (!stakingConfigItem) return null;

                  return (
                    <StakingCard
                      key={stakingBalance.address}
                      // stacked={Boolean(Number(stakingBalance.amount))}
                      token={stakingConfigItem.token}
                      totalSupply={stakingBalance.totalSupplyFloat}
                      poolRate={stakingBalance.poolRate.dailyFloat}
                      lockable={Boolean(stakingBalance.stakingEnd.block)}
                      stakingContractAddress={stakingBalance.address}
                      APY={stakingBalance.roi}
                    />
                  );
                })}
          </div>
          {!config.IS_COLLATERAL && <StakingInfo />}
        </PageWrapper>
      </MainLayout>
    </>
  );
};
