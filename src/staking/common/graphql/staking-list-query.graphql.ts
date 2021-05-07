import { gql } from '@apollo/client';

export const STAKING_LIST_QUERY = gql`
  query StakingList(
    $filter: StakingListQueryFilterInputType
    $userFilter: StakingUserListFilterInputType
  ) {
    stakingList(filter: $filter) {
      address
      totalSupply
      totalSupplyFloat
      stakingTokenDecimals
      stakingToken
      poolRate {
        block
        blockFloat
        daily
        dailyFloat
      }
      stakingEnd {
        block
        date
      }
      unstakingStart {
        block
        date
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
      }
    }
  }
`;
