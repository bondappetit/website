import { useWeb3React } from '@web3-react/core';
import { useEffect, useMemo, useState } from 'react';
import { useAsyncRetry } from 'react-use';
import Web3 from 'web3';

import { BN, useIntervalIfHasAccount, useLazyQuery } from 'src/common';
import { config } from 'src/config';
import { StakingQuery, UniswapPairPayload } from 'src/graphql/_generated-hooks';
import { useStakingConfig } from 'src/staking-config';
import { useGovernanceCost } from './use-governance-cost';
import { STAKING_QUERY_STRING } from './graphql/staking-query.graphql';
import { UNISWAP_PAIR_QUERY_STRING } from './graphql/uniswap-pair-query.graphql';

type StakingToken = {
  token: string[];
  contractName: string;
  configAddress: string;
  pair?: UniswapPairPayload['data'];
  staking?: StakingQuery['staking']['data'];
  chainId?: number;
};

export type SakingItem = {
  id: number;
  amount: BN;
  address: string | undefined;
  apy: string;
  lockable: boolean;
  poolRate: string | undefined;
  totalValueLocked: string;
  stacked: boolean;
  token: string[];
  decimals: number;
  contractName: string;
  configAddress: string;
  date?: string | null;
  chainId?: number;
};

const useStakingQuery = () =>
  useLazyQuery<{ data?: StakingQuery }>(config.API_URL ?? '', {
    query: STAKING_QUERY_STRING
  });
const useUniswapQuery = () =>
  useLazyQuery<{ data?: { uniswapPair?: UniswapPairPayload } }>(
    config.API_URL ?? '',
    {
      query: UNISWAP_PAIR_QUERY_STRING
    }
  );

export const useStakingListData = (address?: string) => {
  const { stakingConfig, stakingConfigValues } = useStakingConfig();

  const { account: web3Account = null } = useWeb3React<Web3>();
  const [account, setAccount] = useState(web3Account);

  const governanceInUSDC = useGovernanceCost();

  const stakingQuery = useStakingQuery();
  const uniswapQuery = useUniswapQuery();

  useEffect(() => {
    if (web3Account) {
      setAccount(web3Account);
    }
  }, [web3Account]);

  const stakingAddresses = useAsyncRetry(async () => {
    const stakingItem = address ? stakingConfig[address.toLowerCase()] : null;

    return (stakingItem ? [stakingItem] : stakingConfigValues).reduce<
      Promise<StakingToken[]>
    >(
      async (
        previousPromise,
        { contractName, token, configAddress, chainId }
      ) => {
        const acc = await previousPromise;

        const options = {
          init: {
            headers: {
              'chain-id': chainId
            }
          }
        };

        const staking = await stakingQuery(
          {
            filter: { address: configAddress },
            userFilter: account ? { address: [account] } : undefined
          },
          options
        );

        const uniswapPair = await uniswapQuery(
          {
            filter: {
              address: staking.data?.staking.data?.stakingToken
            }
          },
          options
        );

        return [
          ...acc,
          {
            stakingBalance: staking.data?.staking,
            pair: uniswapPair.data?.uniswapPair?.data,
            staking: staking.data?.staking.data,
            contractName,
            configAddress,
            token,
            chainId
          }
        ];
      },
      Promise.resolve([])
    );
  }, [address, stakingConfigValues, account]);

  const volume24 = useMemo(
    () =>
      stakingAddresses.value?.reduce(
        (acc, { pair }) => acc.plus(pair?.statistic?.dailyVolumeUSD ?? '0'),
        new BN(0)
      ),
    [stakingAddresses.value]
  );

  const stakingList = useMemo(
    () =>
      stakingAddresses.value?.map((stakingAddress, index) => {
        const stakingBalance = stakingAddress.staking;
        const pairItem = stakingAddress.pair;

        const priceItemtotalSupplyFloatBN = new BN(
          pairItem?.totalSupplyFloat ?? '1'
        );
        const priceItemtotalSupply = priceItemtotalSupplyFloatBN.isZero()
          ? new BN(1)
          : priceItemtotalSupplyFloatBN;

        const stakingBalanceTotalSupplyBN = new BN(
          stakingBalance?.totalSupplyFloat ?? '1'
        );
        const stakingBalanceTotalSupply = stakingBalanceTotalSupplyBN.isZero()
          ? new BN(1)
          : stakingBalanceTotalSupplyBN;

        const priceUSD = new BN(
          pairItem?.statistic?.totalLiquidityUSD ?? '0'
        ).div(priceItemtotalSupply);

        const [reward = undefined] = stakingBalance?.userList ?? [];

        const balanceFloat = new BN(reward?.balanceFloat ?? '0');

        return {
          id: index,
          configAddress: stakingAddress.configAddress,
          amount: balanceFloat,
          address: stakingBalance?.address,
          tokenAddress: stakingBalance?.stakingToken,
          apy: new BN(stakingBalance?.apr.year ?? '0')
            .multipliedBy(100)
            .toString(10),
          lockable: Boolean(stakingBalance?.stakingEnd.block),
          poolRate: stakingBalance?.poolRate.dailyFloat,
          totalValueLocked: new BN(
            pairItem?.statistic?.totalLiquidityUSD ?? '0'
          )
            .div(priceItemtotalSupply)
            .multipliedBy(stakingBalanceTotalSupply)
            .toString(10),
          totalSupplyFloat: pairItem?.totalSupplyFloat,
          decimals: stakingBalance?.stakingTokenDecimals ?? 1,
          stacked: Boolean(reward?.staked),
          token: stakingAddress.token,
          contractName: stakingAddress.contractName,
          amountInUSDC: new BN(balanceFloat).multipliedBy(priceUSD),
          date: stakingBalance?.unstakingStart.date,
          chaindId: stakingAddress.chainId
        };
      }),
    [stakingAddresses.value]
  );

  const totalValueLocked = useMemo(() => {
    if (!stakingList) return new BN(0);

    return stakingList.reduce(
      (acc, stakingItem) => acc.plus(stakingItem.totalValueLocked),
      new BN(0)
    );
  }, [stakingList]);

  const rewardSum = useMemo(
    () =>
      stakingAddresses.value?.reduce(
        (sum, { staking }) => {
          const [reward = undefined] = staking?.userList ?? [];

          return {
            reward: sum.reward.plus(reward?.earnedFloat ?? '0'),
            rewardInUSDC: sum.rewardInUSDC.plus(
              new BN(reward?.earnedFloat ?? '0').multipliedBy(
                governanceInUSDC ?? '0'
              )
            )
          };
        },
        {
          reward: new BN('0'),
          rewardInUSDC: new BN('0')
        }
      ),
    [stakingAddresses.value, governanceInUSDC]
  );

  useIntervalIfHasAccount(stakingAddresses.retry);

  return {
    totalValueLocked,
    volume24,
    governanceInUSDC,
    stakingList,
    rewardSum,
    stakingAddresses
  };
};
