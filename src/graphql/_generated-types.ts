/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
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
