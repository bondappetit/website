import { gql } from '@apollo/client';

export const TOKEN_QUERY = gql`
  query TokenQuery($filter: TokenQueryFilterInputType!) {
    token(filter: $filter) {
      data {
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
    }
  }
`;
