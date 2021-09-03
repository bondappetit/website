import { gql } from '@apollo/client';

export const STAKING_COUPONS_LIST_QUERY = gql`
  query StakingCouponsList(
    $filter: ProfitDistributorListQueryFilterInputType
    $userFilter: ProfitDistributorUserListFilterInputType
  ) {
    profitDistributorList(filter: $filter) {
      address
      stakingToken {
        address
        name
        symbol
        decimals
        totalSupply
        totalSupplyFloat
        priceUSD
        statistic {
          dailyVolumeUSD
          totalLiquidityUSD
        }
      }
      stakingTokenDecimals
      rewardToken {
        address
        name
        symbol
        decimals
        totalSupply
        totalSupplyFloat
        priceUSD
        statistic {
          dailyVolumeUSD
          totalLiquidityUSD
        }
      }
      rewardTokenDecimals
      totalSupply
      totalSupplyFloat
      periodStart
      periodFinish
      rewardsDuration
      rewardForDuration
      rewardForDurationFloat
      earned
      earnedFloat
      poolRate {
        block
        blockFloat
        daily
        dailyFloat
      }
      apr {
        block
        day
        week
        month
        year
      }
      userList(filter: $userFilter) {
        staking
        address
        balance
        balanceFloat
        staked
        earned
        earnedFloat
        stakeAt
        stakeAtDate
        nextLock
        nextLockDate
        nextUnlock
        nextUnlockDate
      }
    }
  }
`;

export const STAKING_COUPONS_LIST_QUERY_STRING =
  STAKING_COUPONS_LIST_QUERY.loc?.source.body ?? '';
