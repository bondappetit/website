import { useWeb3React } from '@web3-react/core';
import { useEffect, useMemo, useState } from 'react';
import { useAsyncRetry, useUpdateEffect } from 'react-use';

import { BN, useBatchRequest, useNetworkConfig } from 'src/common';
import { config } from 'src/config';
import type { Staking } from 'src/generate/Staking';
import {
  useStakingListQuery,
  useTokenListFilterLazyQuery,
  useUniswapPairListLazyQuery
} from 'src/graphql/_generated-hooks';
import { useStakingConfig } from 'src/staking-config';
import { useGovernanceCost } from './use-governance-cost';
import { useStakingContracts } from './use-staking-contracts';
import { useTokenContracts } from './use-token-contract';

type StakingToken = {
  amount: BN;
  balance: string;
  reward: BN;
  tokenAddress: string;
  token: string[];
  rewardInUSDC: BN;
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
  totalSupply: string;
  stacked: boolean;
  token: string[];
  decimals: string;
  stakingContract: Staking;
};

export const useStakingListData = (address?: string, length?: number) => {
  const networkConfig = useNetworkConfig();
  const { stakingConfig, stakingConfigValues } = useStakingConfig(length);

  const { account: web3Account } = useWeb3React();
  const [account, setAccount] = useState(web3Account);

  const makeBatchRequest = useBatchRequest();

  const getStakingContract = useStakingContracts();
  const getTokenContract = useTokenContracts();

  const { governanceInUSDC } = useGovernanceCost();

  const USD = networkConfig.assets.USDC;

  useEffect(() => {
    if (web3Account) {
      setAccount(web3Account);
    }
  }, [web3Account]);

  const stakingListQuery = useStakingListQuery({
    variables: {
      filter: {
        address: Object.keys(stakingConfig)
      }
    },
    pollInterval: config.POLLING_INTERVAL
  });

  const [loadToken, tokenFilterQuery] = useTokenListFilterLazyQuery();

  const stakingAddresses = useAsyncRetry(async () => {
    const stakingItem = address ? stakingConfig[address] : null;

    return (stakingItem ? [stakingItem] : stakingConfigValues).reduce<
      Promise<StakingToken[]>
    >(async (previusPromise, { contractName, token, configAddress }) => {
      const acc = await previusPromise;

      const stakingContract = getStakingContract(contractName);

      if (!stakingContract) return acc;

      const stakingTokenAddress = await stakingContract.methods
        .stakingToken()
        .call();
      const stakingTokenContract = getTokenContract(stakingTokenAddress);

      const [
        stakingTokenDecimals,
        rewardTokenAddress,
        balance,
        earned
      ] = await makeBatchRequest(
        [
          stakingTokenContract.methods.decimals().call,
          stakingContract.methods.rewardsToken().call,
          account ? stakingContract.methods.balanceOf(account).call : '0',
          account ? stakingContract.methods.earned(account).call : '0'
        ],
        account
      );

      const rewardTokenContract = getTokenContract(rewardTokenAddress);
      const rewardTokenDecimals = await rewardTokenContract.methods
        .decimals()
        .call();

      const reward = new BN(earned).div(new BN(10).pow(rewardTokenDecimals));
      const rewardInUSDC = governanceInUSDC
        ? new BN(reward)
            .multipliedBy(governanceInUSDC)
            .div(new BN(10).pow(USD.decimals))
        : new BN(0);

      const amount = new BN(balance).div(new BN(10).pow(stakingTokenDecimals));

      acc.push({
        amount,
        balance,
        reward,
        stakingContract,
        configAddress,
        decimals: stakingTokenDecimals,
        tokenAddress: stakingTokenAddress,
        token,
        rewardInUSDC
      });

      return acc;
    }, Promise.resolve([]));
  }, [address, stakingConfig]);

  const [loadUniswapData, uniswapPairListQuery] = useUniswapPairListLazyQuery();

  const totalValueLocked = useMemo(
    () =>
      uniswapPairListQuery.data?.uniswapPairList?.reduce(
        (acc, pairItem) =>
          acc.plus(
            new BN(pairItem.statistic?.totalLiquidityUSD ?? '0')
              .div(pairItem.totalSupplyFloat)
              .multipliedBy(pairItem.totalSupplyFloat)
          ),
        new BN(0)
      ),
    [uniswapPairListQuery.data]
  );

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

    loadToken(options);
  }, [stakingAddresses.value]);

  const stakingList = useMemo(
    () =>
      stakingAddresses.value?.map((stakingAddress, index) => {
        const stakingBalance = stakingListQuery.data?.stakingList.find(
          (stakingItem) => stakingItem.address === stakingAddress.configAddress
        );
        const pairItem = uniswapPairListQuery.data?.uniswapPairList.find(
          (uniswapPairItem) =>
            stakingAddress.tokenAddress === uniswapPairItem.address
        );
        const tokenItem = tokenFilterQuery.data?.tokenList.find(
          (token) => token.address === stakingAddress.tokenAddress
        );

        const amountInUSDC = new BN(stakingAddress.amount).multipliedBy(
          tokenItem?.priceUSD ?? '1'
        );

        return {
          id: index,
          amount: stakingAddress.amount,
          address: stakingBalance?.address,
          apy: new BN(stakingBalance?.apr.year ?? '0')
            .multipliedBy(100)
            .toString(10),
          lockable: Boolean(stakingBalance?.stakingEnd.block),
          poolRate: stakingBalance?.poolRate.dailyFloat,
          totalSupply: pairItem
            ? new BN(pairItem.statistic?.totalLiquidityUSD ?? '0')
                .div(pairItem.totalSupplyFloat)
                .multipliedBy(pairItem.totalSupplyFloat)
                .toString(10)
            : '0',
          decimals: stakingAddress.decimals,
          stacked: stakingAddress.amount.isGreaterThan(0),
          token: stakingAddress.token,
          stakingContract: stakingAddress.stakingContract,
          amountInUSDC
        };
      }),
    [
      stakingAddresses.value,
      uniswapPairListQuery.data,
      stakingListQuery.data,
      tokenFilterQuery.data
    ]
  );

  const rewardSum = useMemo(
    () =>
      stakingAddresses.value?.reduce(
        (sum, { reward, rewardInUSDC }) => {
          return {
            reward: sum.reward.plus(reward),
            rewardInUSDC: sum.rewardInUSDC.plus(rewardInUSDC)
          };
        },
        {
          reward: new BN('0'),
          rewardInUSDC: new BN('0')
        }
      ),
    [stakingAddresses.value]
  );

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
