import { useQuery } from './use-query';

const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

const QUERY = `
  query Pair($id: String!) {
    pair(
      id: $id
    ) {
      reserveUSD
      totalSupply
    }
  }
`;

type Maybe<T> = T | null;

type PairData = {
  reserveUSD: Maybe<string>;
  totalSupply: Maybe<string>;
};

export type PairInfo = {
  data: {
    pair: Maybe<PairData>;
  };
};

export const useUniswapPairInfo = () => {
  const state = useQuery<PairInfo>(url, {
    query: QUERY,
    variables: {
      id: '' // todo: paidId
    }
  });

  return state;
};
