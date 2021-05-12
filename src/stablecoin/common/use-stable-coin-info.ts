import { useQuery, useNetworkConfig } from 'src/common';
import { config } from 'src/config';

const QUERY = `
  query Token($filter: TokenQueryFilterInputType!) {
    token(
      filter: $filter
    ) {
      data {
        statistic {
          totalLiquidityUSD
        }
      }
    }
  }
`;

const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

type Maybe<T> = T | null;

export type SablecoinInfo = {
  data: {
    token: Maybe<{
      data: Maybe<{
        statistic: Maybe<{
          totalLiquidityUSD: Maybe<string>;
        }>;
      }>;
    }>;
  };
};

export const useStablecoinInfo = () => {
  const networkConfig = useNetworkConfig();

  const state = useQuery<SablecoinInfo>(
    config.API_URL ?? '',
    {
      query: QUERY,
      variables: {
        filter: {
          address: networkConfig.assets.Stable?.address ?? DEFAULT_ADDRESS
        }
      }
    },
    [networkConfig.assets]
  );

  return state;
};
