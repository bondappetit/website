import { useLazyQuery } from 'src/common';

const QUERY = `
  query PairDayDatas($pairAddress: Bytes!) {
    pairDayDatas (
      where: {
        pairAddress: $pairAddress
      }
      orderBy: date
      orderDirection: desc
    ) {
      dailyVolumeUSD
    }
  }
`;

const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

type Maybe<T> = T | null;

type PairData = {
  dailyVolumeUSD: Maybe<string>;
};

type Response = {
  data: {
    pairDayDatas: Maybe<PairData[]>;
  };
};

export const useVolumeInfo = () =>
  useLazyQuery<Response>(url, {
    query: QUERY
  });
