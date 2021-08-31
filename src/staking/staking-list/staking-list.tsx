import React from 'react';

import { MainLayout } from 'src/layouts';
import {
  PageWrapper,
  Typography,
  Head,
  numberArray,
  humanizeNumeral,
  BN
} from 'src/common';
import {
  StakingCard,
  StakingInfo,
  StakingLabel,
  useStakingListData
} from 'src/staking/common';
import { config } from 'src/config';
import { useStakingConfig } from 'src/staking-config';
import { useStakingListStyles } from './staking-list.styles';
import { StakingSwopFi } from '../staking-swop-fi/staking-swop-fi';

export const StakingList: React.VFC = () => {
  const classes = useStakingListStyles();

  const { stakingConfigValues } = useStakingConfig();

  const { stakingList, rewardSum, swopfiItem, swopfiLoading } =
    useStakingListData();

  return (
    <>
      <Head title="Earn Staking Rewards in BAG by providing liquidity for protocol's assets" />
      <MainLayout>
        <PageWrapper>
          <div className={classes.header}>
            <div className={classes.titleWrap}>
              <Typography variant="h1" component="h2" className={classes.title}>
                Earn liquidity rewards
              </Typography>
              <Typography variant="h5" className={classes.title}>
                Earn Staking Rewards in BAG by locking your assets for a certain
                period of time and providing liquidity for protocol&apos;s
                assets.
              </Typography>
              <StakingLabel
                title="You earned"
                loading={!stakingList}
                align="left"
                value={<>{humanizeNumeral(rewardSum?.reward)} BAG</>}
              >
                {rewardSum?.rewardInUSDC.isGreaterThan(0) && (
                  <> (${humanizeNumeral(rewardSum?.rewardInUSDC)})</>
                )}
              </StakingLabel>
            </div>
          </div>
          <div className={classes.staking}>
            {config.SWOP_FI_ENABLE && (
              <StakingSwopFi
                tvl={swopfiItem?.totalLiquidityUSD}
                apy={new BN(swopfiItem?.apr.year ?? '0')
                  .multipliedBy(100)
                  .toString(10)}
                loading={swopfiLoading}
              />
            )}
            {!stakingList
              ? numberArray(stakingConfigValues.length).map((key) => (
                  <StakingCard key={key} loading />
                ))
              : stakingList?.map((stakingItem) => {
                  return (
                    <StakingCard
                      key={stakingItem.id}
                      stacked={stakingItem.stacked}
                      token={stakingItem.token}
                      totalValueLocked={stakingItem.totalValueLocked}
                      poolRate={stakingItem.poolRate}
                      lockable={stakingItem.lockable}
                      stakingContractAddress={stakingItem.configAddress}
                      unstakingStartDate={stakingItem.unstakingStartDate}
                      APY={stakingItem.apy}
                      chainId={stakingItem.chainId}
                      earnToken={stakingItem.earnToken}
                      stakingEndBlock={stakingItem.stakingEndBlock}
                      stakingEndDate={stakingItem.stakingEndDate}
                      status={stakingItem.status}
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
