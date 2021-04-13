import { gql } from '@apollo/client';

export const UNISWAP_PAIR_LIST = gql`
  query UniswapPairList($filter: UniswapPairListQueryFilterInputType) {
    uniswapPairList(filter: $filter) {
      totalSupplyFloat
      statistic {
        dailyVolumeUSD
        totalLiquidityUSD
      }
    }
  }
`;
