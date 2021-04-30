import { useWeb3React } from '@web3-react/core';
import { useEffect, useMemo, useState } from 'react';
import { useAsyncRetry, useUpdateEffect } from 'react-use';
import Web3 from 'web3';

import { BN, useIntervalIfHasAccount, useNetworkConfig } from 'src/common';
import { config } from 'src/config';
import type { Staking } from 'src/generate/Staking';
import {
  useStakingListQuery,
  useUniswapPairListLazyQuery
} from 'src/graphql/_generated-hooks';
import { useStakingConfig } from 'src/staking-config';
import { useGovernanceCost } from './use-governance-cost';
import { useStakingContracts } from './use-staking-contracts';

type StakingToken = {
  tokenAddress: string;
  token: string[];
  decimals: string;
  stakingContract: Staking;
  configAddress: string;
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
  decimals: string;
  stakingContract: Staking;
  date?: string | null;
};

export const useStakingListData = (address?: string, length?: number) => {
  const networkConfig = useNetworkConfig();
  const { stakingConfig, stakingConfigValues } = useStakingConfig(length);

  const { account: web3Account } = useWeb3React<Web3>();
  const [account, setAccount] = useState(web3Account);

  const getStakingContract = useStakingContracts();

  const { governanceInUSDC } = useGovernanceCost();

  const USD = networkConfig.assets.USDC;

  const stakingListQuery = useStakingListQuery({
    variables: {
      filter: {
        address: address ? [address] : Object.keys(stakingConfig)
      },
      userFilter: account
        ? {
            address: [account]
          }
        : undefined
    },
    pollInterval: config.POLLING_INTERVAL,
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (web3Account) {
      setAccount(web3Account);
    }
  }, [web3Account]);

  const [loadUniswapData, uniswapPairListQuery] = useUniswapPairListLazyQuery();

  const stakingAddresses = useAsyncRetry(async () => {
    const stakingItem = address ? stakingConfig[address.toLowerCase()] : null;

    return (stakingItem ? [stakingItem] : stakingConfigValues).reduce<
      Promise<StakingToken[]>
    >(async (previusPromise, { contractName, token, configAddress }) => {
      const acc = await previusPromise;

      const stakingContract = getStakingContract(contractName);

      if (!stakingContract) return acc;

      const stakingTokenAddress = await stakingContract.methods
        .stakingToken()
        .call();

      const stakingTokenDecimals = await stakingContract.methods
        .periodFinish()
        .call();

      acc.push({
        stakingContract,
        configAddress,
        decimals: stakingTokenDecimals,
        tokenAddress: stakingTokenAddress,
        token
      });

      return acc;
    }, Promise.resolve([]));
  }, [address, account, stakingConfig, USD.decimals]);

  const volume24 = useMemo(
    () =>
      uniswapPairListQuery.data?.uniswapPairList?.reduce(
        (acc, { statistic }) => acc.plus(statistic?.dailyVolumeUSD ?? '0'),
        new BN(0)
      ),
    [uniswapPairListQuery.data]
  );

  const normalizeGovernanceInUSDC = useMemo(() => {
    if (!governanceInUSDC) return new BN('0');

    return new BN(governanceInUSDC).div(
      new BN(10).pow(networkConfig.assets.USDC.decimals)
    );
  }, [governanceInUSDC, networkConfig.assets.USDC.decimals]);

  useUpdateEffect(() => {
    if (!stakingAddresses.value) return;

    const stakingTokenAddresses = stakingAddresses.value.map(
      ({ tokenAddress }) => tokenAddress
    );

    const options = {
      variables: {
        filter: {
          address: stakingTokenAddresses
        }
      }
    };

    loadUniswapData(options);
  }, [stakingAddresses.value, account]);

  const stakingList = useMemo(
    () =>
      stakingAddresses.value?.map((stakingAddress, index) => {
        const stakingBalance = stakingListQuery.data?.stakingList.find(
          (stakingItem) =>
            stakingItem.address.toLowerCase() ===
            stakingAddress.configAddress.toLowerCase()
        );
        const pairItem = uniswapPairListQuery.data?.uniswapPairList.find(
          (uniswapPairItem) =>
            stakingAddress.tokenAddress.toLowerCase() ===
            uniswapPairItem.address
        );

        const priceItemtotalSupplyFloatBN = new BN(
          pairItem?.totalSupplyFloat ?? '1'
        );
        const priceItemtotalSupply = priceItemtotalSupplyFloatBN.isZero()
          ? '1'
          : priceItemtotalSupplyFloatBN;

        const stakingBalanceTotalSupplyBN = new BN(
          stakingBalance?.totalSupplyFloat ?? '1'
        );
        const stakingBalanceTotalSupply = stakingBalanceTotalSupplyBN.isZero()
          ? '1'
          : stakingBalanceTotalSupplyBN;

        const priceUSD = new BN(
          pairItem?.statistic?.totalLiquidityUSD ?? '0'
        ).div(priceItemtotalSupply);

        const [reward = undefined] = stakingBalance?.userList ?? [];

        const balanceFloat = new BN(reward?.balanceFloat ?? '0');

        return {
          id: index,
          amount: balanceFloat,
          address: stakingBalance?.address,
          tokenAddress: stakingAddress.tokenAddress,
          apy: new BN(stakingBalance?.apr.year ?? '0')
            .multipliedBy(100)
            .toString(10),
          lockable: Boolean(stakingBalance?.stakingEnd.block),
          poolRate: stakingBalance?.poolRate.dailyFloat,
          totalValueLocked:
            pairItem && stakingBalance
              ? new BN(pairItem.statistic?.totalLiquidityUSD ?? '0')
                  .div(priceItemtotalSupply)
                  .multipliedBy(stakingBalanceTotalSupply)
                  .toString(10)
              : '0',
          totalSupplyFloat: pairItem?.totalSupplyFloat,
          decimals: stakingAddress.decimals,
          stacked: Boolean(reward?.staked),
          token: stakingAddress.token,
          stakingContract: stakingAddress.stakingContract,
          amountInUSDC: new BN(balanceFloat).multipliedBy(priceUSD),
          date: stakingBalance?.unstakingStart.date
        };
      }),
    [stakingAddresses.value, uniswapPairListQuery.data, stakingListQuery.data]
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
      stakingListQuery.data?.stakingList?.reduce(
        (sum, { userList }) => {
          const [reward] = userList;

          return {
            reward: sum.reward.plus(reward?.earnedFloat ?? '0'),
            rewardInUSDC: sum.rewardInUSDC.plus(
              new BN(reward?.earnedFloat ?? '0')
                .multipliedBy(governanceInUSDC ?? '0')
                .div(new BN(10).pow(USD.decimals))
            )
          };
        },
        {
          reward: new BN('0'),
          rewardInUSDC: new BN('0')
        }
      ),
    [stakingListQuery.data, governanceInUSDC, USD.decimals]
  );

  useIntervalIfHasAccount(stakingAddresses.retry);

  return {
    stakingListQuery,
    uniswapPairListQuery,
    totalValueLocked,
    volume24,
    governanceInUSDC: normalizeGovernanceInUSDC,
    stakingList,
    rewardSum,
    stakingAddresses,
    count: stakingConfigValues.length
  };
};
