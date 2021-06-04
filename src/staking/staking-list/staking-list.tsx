import React from 'react';

import { MainLayout } from 'src/layouts';
import {
  PageWrapper,
  Typography,
  Head,
  Plate,
  numberArray,
  humanizeNumeral
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

  const {
    totalValueLocked,
    volume24,
    governanceInUSDC,
    stakingList,
    rewardSum,
    swopfiItem,
    swopfiLoading
  } = useStakingListData();

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
                loading={!stakingList}
                value={<>${humanizeNumeral(totalValueLocked)}</>}
              />
              <StakingLabel
                className={classes.bag}
                title="BAG price"
                loading={!stakingList || !governanceInUSDC}
                value={<>${humanizeNumeral(governanceInUSDC)}</>}
              />
              <StakingLabel
                className={classes.bag}
                title="You earned"
                loading={!stakingList}
                value={<>{humanizeNumeral(rewardSum?.reward)} BAG</>}
              >
                {rewardSum?.rewardInUSDC.isGreaterThan(0) && (
                  <> (${humanizeNumeral(rewardSum?.rewardInUSDC)})</>
                )}
              </StakingLabel>
              <StakingLabel
                title="Volume (24h)"
                loading={!stakingList}
                value={<>${humanizeNumeral(volume24)}</>}
              />
            </Plate>
          </div>
          <div className={classes.staking}>
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
            {config.SWOP_FI_ENABLE && (
              <StakingSwopFi
                tvl={swopfiItem?.totalLiquidityUSD}
                apy={swopfiItem?.apr.year}
                loading={swopfiLoading}
              />
            )}
          </div>
          {!config.IS_COLLATERAL && <StakingInfo />}
        </PageWrapper>
      </MainLayout>
    </>
  );
};
