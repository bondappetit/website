/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Ethereum wallet address */
  AddressType: string;
  /** Дата и время */
  DateTimeType: string;
};

export type Query = {
  __typename?: 'Query';
  token: TokenPayload;
  tokenList: Array<TokenType>;
  uniswapPair: UniswapPairPayload;
  uniswapPairList: Array<UniswapPairType>;
  staking: StakingPayload;
  stakingList: Array<StakingType>;
};

export type QueryTokenArgs = {
  filter: TokenQueryFilterInputType;
};

export type QueryTokenListArgs = {
  filter?: Maybe<TokenListQueryFilterInputType>;
};

export type QueryUniswapPairArgs = {
  filter: UniswapPairQueryFilterInputType;
};

export type QueryUniswapPairListArgs = {
  filter?: Maybe<UniswapPairListQueryFilterInputType>;
};

export type QueryStakingArgs = {
  filter: StakingQueryFilterInputType;
};

export type QueryStakingListArgs = {
  filter?: Maybe<StakingListQueryFilterInputType>;
};

export type StakingListQueryFilterInputType = {
  /** List of target staking contract addresses */
  address?: Maybe<Array<Scalars['AddressType']>>;
};

export type StakingPayload = {
  __typename?: 'StakingPayload';
  data?: Maybe<StakingType>;
  error?: Maybe<Scalars['String']>;
};

export type StakingPoolRateType = {
  __typename?: 'StakingPoolRateType';
  /** Pool rate per block */
  block: Scalars['String'];
  /** Pool rate per block normalize */
  blockFloat: Scalars['String'];
  /** Pool rate per day */
  daily: Scalars['String'];
  /** Pool rate per day normalize */
  dailyFloat: Scalars['String'];
};

export type StakingQueryFilterInputType = {
  /** Target staking contract address */
  address: Scalars['AddressType'];
};

export type StakingStakingEndType = {
  __typename?: 'StakingStakingEndType';
  /** Block number of end staking */
  block?: Maybe<Scalars['String']>;
  /** Date of end staking */
  date?: Maybe<Scalars['DateTimeType']>;
};

export type StakingType = {
  __typename?: 'StakingType';
  /** Staking contract address */
  address: Scalars['AddressType'];
  /** Staking total supply */
  totalSupply: Scalars['String'];
  /** Staking total supply normalize */
  totalSupplyFloat: Scalars['String'];
  poolRate: StakingPoolRateType;
  stakingEnd: StakingStakingEndType;
  unstakingStart: StakingUnstakingStartType;
  /** Return on investment */
  roi?: Maybe<Scalars['String']>;
};

export type StakingUnstakingStartType = {
  __typename?: 'StakingUnstakingStartType';
  /** Block number of start unstaking */
  block?: Maybe<Scalars['String']>;
  /** Date of start unstaking */
  date?: Maybe<Scalars['DateTimeType']>;
};

export type TokenListQueryFilterInputType = {
  /** List of target token addresses */
  address?: Maybe<Array<Scalars['AddressType']>>;
};

export type TokenPayload = {
  __typename?: 'TokenPayload';
  data?: Maybe<TokenType>;
  error?: Maybe<Scalars['String']>;
};

export type TokenQueryFilterInputType = {
  /** Target token address */
  address: Scalars['AddressType'];
};

export type TokenStatisticType = {
  __typename?: 'TokenStatisticType';
  /** Token daily volume at USD */
  dailyVolumeUSD: Scalars['String'];
  /** Token total liquidity at USD */
  totalLiquidityUSD: Scalars['String'];
};

export type TokenType = {
  __typename?: 'TokenType';
  /** Token address */
  address: Scalars['AddressType'];
  /** Token name */
  name: Scalars['String'];
  /** Token symbol */
  symbol: Scalars['String'];
  /** Token decimals */
  decimals: Scalars['Int'];
  /** Token total supply */
  totalSupply: Scalars['String'];
  /** Token total supply normalize */
  totalSupplyFloat: Scalars['String'];
  /** Token price at USD */
  priceUSD: Scalars['String'];
  statistic?: Maybe<TokenStatisticType>;
};

export type UniswapPairListQueryFilterInputType = {
  /** List of target pair addresses */
  address?: Maybe<Array<Scalars['AddressType']>>;
};

export type UniswapPairPayload = {
  __typename?: 'UniswapPairPayload';
  data?: Maybe<UniswapPairType>;
  error?: Maybe<Scalars['String']>;
};

export type UniswapPairQueryFilterInputType = {
  /** Target pair address */
  address: Scalars['AddressType'];
};

export type UniswapPairStatisticType = {
  __typename?: 'UniswapPairStatisticType';
  /** Pair daily volume at USD */
  dailyVolumeUSD: Scalars['String'];
  /** Pair total liquidity at USD */
  totalLiquidityUSD: Scalars['String'];
};

export type UniswapPairType = {
  __typename?: 'UniswapPairType';
  /** Pair address */
  address: Scalars['AddressType'];
  /** Pair total supply normalize */
  totalSupplyFloat: Scalars['String'];
  statistic?: Maybe<UniswapPairStatisticType>;
};

export type StakingListQueryVariables = Exact<{
  filter?: Maybe<StakingListQueryFilterInputType>;
}>;

export type StakingListQuery = { __typename?: 'Query' } & {
  stakingList: Array<
    { __typename?: 'StakingType' } & Pick<
      StakingType,
      'address' | 'totalSupply' | 'totalSupplyFloat' | 'roi'
    > & {
        poolRate: { __typename?: 'StakingPoolRateType' } & Pick<
          StakingPoolRateType,
          'block' | 'blockFloat' | 'daily' | 'dailyFloat'
        >;
        stakingEnd: { __typename?: 'StakingStakingEndType' } & Pick<
          StakingStakingEndType,
          'block' | 'date'
        >;
        unstakingStart: { __typename?: 'StakingUnstakingStartType' } & Pick<
          StakingUnstakingStartType,
          'block' | 'date'
        >;
      }
  >;
};

export type TokenQueryQueryVariables = Exact<{
  filter: TokenQueryFilterInputType;
}>;

export type TokenQueryQuery = { __typename?: 'Query' } & {
  token: { __typename?: 'TokenPayload' } & {
    data?: Maybe<
      { __typename?: 'TokenType' } & Pick<
        TokenType,
        | 'name'
        | 'symbol'
        | 'decimals'
        | 'totalSupply'
        | 'totalSupplyFloat'
        | 'priceUSD'
      > & {
          statistic?: Maybe<
            { __typename?: 'TokenStatisticType' } & Pick<
              TokenStatisticType,
              'dailyVolumeUSD' | 'totalLiquidityUSD'
            >
          >;
        }
    >;
  };
};

export type UniswapPairListQueryVariables = Exact<{
  filter?: Maybe<UniswapPairListQueryFilterInputType>;
}>;

export type UniswapPairListQuery = { __typename?: 'Query' } & {
  uniswapPairList: Array<
    { __typename?: 'UniswapPairType' } & Pick<
      UniswapPairType,
      'totalSupplyFloat'
    > & {
        statistic?: Maybe<
          { __typename?: 'UniswapPairStatisticType' } & Pick<
            UniswapPairStatisticType,
            'dailyVolumeUSD' | 'totalLiquidityUSD'
          >
        >;
      }
  >;
};

export const StakingListDocument = gql`
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
      roi
    }
  }
`;

/**
 * __useStakingListQuery__
 *
 * To run a query within a React component, call `useStakingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStakingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStakingListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useStakingListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    StakingListQuery,
    StakingListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<StakingListQuery, StakingListQueryVariables>(
    StakingListDocument,
    options
  );
}
export function useStakingListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    StakingListQuery,
    StakingListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    StakingListQuery,
    StakingListQueryVariables
  >(StakingListDocument, options);
}
export type StakingListQueryHookResult = ReturnType<typeof useStakingListQuery>;
export type StakingListLazyQueryHookResult = ReturnType<
  typeof useStakingListLazyQuery
>;
export type StakingListQueryResult = Apollo.QueryResult<
  StakingListQuery,
  StakingListQueryVariables
>;
export const TokenQueryDocument = gql`
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

/**
 * __useTokenQueryQuery__
 *
 * To run a query within a React component, call `useTokenQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTokenQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTokenQueryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useTokenQueryQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    TokenQueryQuery,
    TokenQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<TokenQueryQuery, TokenQueryQueryVariables>(
    TokenQueryDocument,
    options
  );
}
export function useTokenQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TokenQueryQuery,
    TokenQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    TokenQueryQuery,
    TokenQueryQueryVariables
  >(TokenQueryDocument, options);
}
export type TokenQueryQueryHookResult = ReturnType<typeof useTokenQueryQuery>;
export type TokenQueryLazyQueryHookResult = ReturnType<
  typeof useTokenQueryLazyQuery
>;
export type TokenQueryQueryResult = Apollo.QueryResult<
  TokenQueryQuery,
  TokenQueryQueryVariables
>;
export const UniswapPairListDocument = gql`
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

/**
 * __useUniswapPairListQuery__
 *
 * To run a query within a React component, call `useUniswapPairListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUniswapPairListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUniswapPairListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUniswapPairListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UniswapPairListQuery,
    UniswapPairListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    UniswapPairListQuery,
    UniswapPairListQueryVariables
  >(UniswapPairListDocument, options);
}
export function useUniswapPairListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UniswapPairListQuery,
    UniswapPairListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    UniswapPairListQuery,
    UniswapPairListQueryVariables
  >(UniswapPairListDocument, options);
}
export type UniswapPairListQueryHookResult = ReturnType<
  typeof useUniswapPairListQuery
>;
export type UniswapPairListLazyQueryHookResult = ReturnType<
  typeof useUniswapPairListLazyQuery
>;
export type UniswapPairListQueryResult = Apollo.QueryResult<
  UniswapPairListQuery,
  UniswapPairListQueryVariables
>;
