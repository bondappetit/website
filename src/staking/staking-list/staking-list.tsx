import clsx from 'clsx';
import { useToggle } from 'react-use';
import React from 'react';

import { MainLayout } from 'src/layouts';
import {
  PageWrapper,
  Typography,
  Head,
  numberArray,
  humanizeNumeral,
  BN,
  ButtonBase,
  Link,
  Plate,
  Status
} from 'src/common';
import {
  StakingCard,
  StakingInfo,
  StakingLabel,
  useStakingListData
} from 'src/staking/common';
import { config } from 'src/config';
import { StakingStatuses, useStakingConfig } from 'src/staking-config';
import { useStakingListStyles } from './staking-list.styles';
import { StakingSwopFi } from '../staking-swop-fi/staking-swop-fi';

const REWARDS = [
  {
    staked: false,
    month: '3',
    apy: '3.56',
    deposit: 'BAG',
    earn: 'USDC',
    totalSupply: '487642',
    poolRate: '250000'
  },
  {
    staked: true,
    month: '6',
    apy: '8.4',
    deposit: 'BAG',
    earn: 'USDC',
    totalSupply: '487642',
    poolRate: '250000'
  },
  {
    staked: false,
    month: '12',
    apy: '14.72',
    deposit: 'BAG',
    earn: 'USDC',
    totalSupply: '487642',
    poolRate: '250000'
  }
];

export const StakingList: React.VFC = () => {
  const classes = useStakingListStyles();

  const [showMore, setShowMore] = useToggle(false);

  const { stakingConfigValues } = useStakingConfig();

  const { stakingList, rewardSum, swopfiItem, swopfiLoading } =
    useStakingListData();

  const activeStaking = stakingList?.filter(
    ({ status }) => status === StakingStatuses.active
  );

  const archivedStaking = stakingList?.filter(
    ({ status }) => status === StakingStatuses.archived
  );

  const activeStakingConfig = stakingConfigValues.filter(
    ({ status }) => status === StakingStatuses.active
  );

  return (
    <>
      <Head title="Earn Staking Rewards in BAG by providing liquidity for protocol's assets" />
      <MainLayout>
        <PageWrapper>
          <div className={classes.header}>
            <div className={classes.titleWrap}>
              <Typography variant="h1" component="h2" className={classes.title}>
                Earn coupon rewards
              </Typography>
              <Typography variant="h5" className={classes.title}>
                BAG holders receive coupon payments from bonds that back the
                USDap stablecoin. Interest income in USDC is distributed among
                token holders every quarter.{' '}
                <Link color="blue" href="/">
                  How it works
                </Link>
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
          <div className={clsx(classes.staking, classes.mb160)}>
            {REWARDS.map((reward) => (
              <Plate key={reward.month} className={classes.card}>
                {reward.staked && (
                  <Status
                    color="grey"
                    variant="contained"
                    className={classes.staked}
                  >
                    Staked
                  </Status>
                )}
                <div className={classes.mb40}>
                  <Typography
                    align="center"
                    variant="h3"
                    weight="semibold"
                    className={classes.mb4}
                  >
                    {reward.month} Months Lock
                  </Typography>
                  <Typography align="center" variant="h3">
                    APY: {humanizeNumeral(reward.apy)}%
                  </Typography>
                </div>
                <div>
                  <Typography align="center" className={classes.mb4}>
                    Deposit:{' '}
                    <Typography variant="inherit" weight="semibold">
                      {reward.deposit}
                    </Typography>
                  </Typography>
                  <Typography align="center" className={classes.mb4}>
                    Earn:{' '}
                    <Typography variant="inherit" weight="semibold">
                      {reward.earn}
                    </Typography>
                  </Typography>
                  <Typography align="center" className={classes.mb4}>
                    Total supply:{' '}
                    <Typography variant="inherit" weight="semibold">
                      ${humanizeNumeral(reward.totalSupply)}
                    </Typography>
                  </Typography>
                  <Typography align="center">
                    Pool rate:{' '}
                    <Typography variant="inherit" weight="semibold">
                      {humanizeNumeral(reward.poolRate)} USDC / day
                    </Typography>
                  </Typography>
                </div>
              </Plate>
            ))}
          </div>
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
            {!activeStaking
              ? numberArray(activeStakingConfig.length).map((key) => (
                  <StakingCard key={key} loading />
                ))
              : [
                  ...(activeStaking ?? []),
                  ...(showMore && archivedStaking ? archivedStaking : [])
                ].map((stakingItem) => {
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
          {!showMore && (
            <ButtonBase className={classes.showMore} onClick={setShowMore}>
              Show {archivedStaking?.length ?? '...'} archived pools ↓
            </ButtonBase>
          )}
          {!config.IS_COLLATERAL && <StakingInfo />}
        </PageWrapper>
      </MainLayout>
    </>
  );
};
