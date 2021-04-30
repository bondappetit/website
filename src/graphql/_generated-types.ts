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
  /** Ethereum transaction hash */
  TxHashType: any;
};

export type BurgerSwapBridgeTransitInput = {
  /** Transaction hash */
  tx: Scalars['TxHashType'];
  /** Wallet address of transaction owner */
  owner: Scalars['AddressType'];
  /** Transit type */
  type: BurgerSwapBridgeTransitTypeEnum;
};

export type BurgerSwapBridgeTransitType = {
  __typename?: 'BurgerSwapBridgeTransitType';
  /** Transaction hash */
  tx: Scalars['TxHashType'];
  /** Transit type */
  type: BurgerSwapBridgeTransitTypeEnum;
  /** Wallet address of transaction owner */
  owner: Scalars['AddressType'];
  /** Created at date */
  createdAt: Scalars['DateTimeType'];
};

export enum BurgerSwapBridgeTransitTypeEnum {
  /** Withdraw BEP20 on Binance */
  BscWithdraw = 'bscWithdraw',
  /** Withdraw ERC20 on Ethereum */
  EthTransit = 'ethTransit'
}

export type MediumPostType = {
  __typename?: 'MediumPostType';
  /** Global unique id */
  guid: Scalars['String'];
  /** Title */
  title: Scalars['String'];
  /** Publication date */
  pubDate: Scalars['DateTimeType'];
  /** Link */
  link: Scalars['String'];
  /** Author */
  author: Scalars['String'];
  /** Thumbnail */
  thumbnail: Scalars['String'];
  /** Description */
  description: Scalars['String'];
  /** Content */
  content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBurgerSwapBridgeTransit: BurgerSwapBridgeTransitType;
};

export type MutationAddBurgerSwapBridgeTransitArgs = {
  input: BurgerSwapBridgeTransitInput;
};

export type Query = {
  __typename?: 'Query';
  getTVL: Scalars['String'];
  token: TokenPayload;
  tokenList: Array<TokenType>;
  uniswapPair: UniswapPairPayload;
  uniswapPairList: Array<UniswapPairType>;
  staking: StakingPayload;
  stakingList: Array<StakingType>;
  mediumPostList: Array<MediumPostType>;
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

export type StakingAprType = {
  __typename?: 'StakingAprType';
  /** APR per block */
  block: Scalars['String'];
  /** APR per day */
  day: Scalars['String'];
  /** APR per week */
  week: Scalars['String'];
  /** APR per month */
  month: Scalars['String'];
  /** APR per year */
  year: Scalars['String'];
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
  apr: StakingAprType;
  userList: Array<StakingUserType>;
};

export type StakingTypeUserListArgs = {
  filter?: Maybe<StakingUserListFilterInputType>;
};

export type StakingUnstakingStartType = {
  __typename?: 'StakingUnstakingStartType';
  /** Block number of start unstaking */
  block?: Maybe<Scalars['String']>;
  /** Date of start unstaking */
  date?: Maybe<Scalars['DateTimeType']>;
};

export type StakingUserListFilterInputType = {
  /** List of target wallets */
  address?: Maybe<Array<Scalars['AddressType']>>;
};

export type StakingUserType = {
  __typename?: 'StakingUserType';
  /** Staking contract address */
  staking: Scalars['AddressType'];
  /** User wallet address */
  address: Scalars['AddressType'];
  /** Staking balance */
  balance: Scalars['String'];
  /** Staking balance normalize */
  balanceFloat: Scalars['String'];
  /** Is staked */
  staked: Scalars['Boolean'];
  /** Earned balance */
  earned: Scalars['String'];
  /** Earned balance normalize */
  earnedFloat: Scalars['String'];
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

export type AddBurgerSwapBridgeTransitMutationVariables = Exact<{
  input: BurgerSwapBridgeTransitInput;
}>;

export type AddBurgerSwapBridgeTransitMutation = { __typename?: 'Mutation' } & {
  addBurgerSwapBridgeTransit: {
    __typename?: 'BurgerSwapBridgeTransitType';
  } & Pick<BurgerSwapBridgeTransitType, 'tx' | 'type' | 'owner' | 'createdAt'>;
};

export type StakingListQueryVariables = Exact<{
  filter?: Maybe<StakingListQueryFilterInputType>;
  userFilter?: Maybe<StakingUserListFilterInputType>;
}>;

export type StakingListQuery = { __typename?: 'Query' } & {
  stakingList: Array<
    { __typename?: 'StakingType' } & Pick<
      StakingType,
      'address' | 'totalSupply' | 'totalSupplyFloat'
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
        apr: { __typename?: 'StakingAprType' } & Pick<
          StakingAprType,
          'block' | 'day' | 'week' | 'month' | 'year'
        >;
        userList: Array<
          { __typename?: 'StakingUserType' } & Pick<
            StakingUserType,
            | 'staking'
            | 'address'
            | 'balance'
            | 'balanceFloat'
            | 'staked'
            | 'earned'
            | 'earnedFloat'
          >
        >;
      }
  >;
};

export type TokenListFilterQueryVariables = Exact<{
  filter?: Maybe<TokenListQueryFilterInputType>;
}>;

export type TokenListFilterQuery = { __typename?: 'Query' } & {
  tokenList: Array<
    { __typename?: 'TokenType' } & Pick<
      TokenType,
      | 'address'
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

export type UniswapPairListQueryVariables = Exact<{
  filter?: Maybe<UniswapPairListQueryFilterInputType>;
}>;

export type UniswapPairListQuery = { __typename?: 'Query' } & {
  uniswapPairList: Array<
    { __typename?: 'UniswapPairType' } & Pick<
      UniswapPairType,
      'address' | 'totalSupplyFloat'
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
