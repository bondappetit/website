import { useQuery, dateUtils } from 'src/common';

const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

const QUERY = `
  query TokenDayDatas($token: String!, $date: Int!) {
    tokenDayDatas(
      first: 5
      orderBy: date
      orderDirection: desc
      where:{
        token: $token
        date_gt: $date
      }
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

const token = '0xdac17f958d2ee523a2206206994597c13d831ec7';

const date = dateUtils.startOfYesterday;

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
  const state = useQuery<SablecoinInfo>(url, {
    query: QUERY,
    variables: { date, token }
  });

  return state;
};
