import { gql } from '@apollo/client';

export const STAKING_UNI_V3 = gql`
  query UniswapV3Pair($filter: UniswapV3PairQueryFilterInputType!) {
    uniswapV3Pair(filter: $filter) {
      data {
        address
        token0Address
        token1Address
        totalLiquidityUSD
      }
    }
  }
`;
