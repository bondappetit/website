import { useQuery, useNetworkConfig } from 'src/common';

const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

const QUERY = `
  query TokenDayDatas($token: String!) {
    tokenDayDatas(
      first: 5
      orderBy: date
      orderDirection: desc
      where:{ token: $token }
    ) {
      token {
        id
        symbol
        decimals
      }
      date
      dailyVolumeUSD
      totalLiquidityUSD
    }
  }
`;

const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

type Maybe<T> = T | null;

type Token = {
  decimals: Maybe<string>;
  id: Maybe<string>;
  symbol: Maybe<string>;
};

type TokenDayDatas = {
  dailyVolumeUSD: Maybe<string>;
  date: Maybe<number>;
  token: Maybe<Token>;
  totalLiquidityUSD: Maybe<string>;
};

export type SablecoinInfo = {
  data: {
    tokenDayDatas: TokenDayDatas[];
  };
};

export const useStablecoinInfo = () => {
  const networkConfig = useNetworkConfig();

  const state = useQuery<SablecoinInfo>(
    url,
    {
      query: QUERY,
      variables: {
        token: (
          networkConfig.assets.Stable?.address ?? DEFAULT_ADDRESS
        ).toLowerCase()
      }
    },
    [networkConfig.assets]
  );

  return state;
};
