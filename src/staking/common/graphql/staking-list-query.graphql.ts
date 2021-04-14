import { gql } from '@apollo/client';

export const STAKING_LIST_QUERY = gql`
  query StakingList($filter: StakingListQueryFilterInputType) {
    stakingList(filter: $filter) {
      address
      totalSupply
      totalSupplyFloat
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
    }
  }
`;
