import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { useAsyncRetry } from 'react-use';
import { BN, isEmpty, useLazyQuery, useNetworkConfig } from 'src/common';
import { config } from 'src/config';
import { StakingCouponsListQuery } from 'src/graphql/_generated-hooks';
import { STAKING_COUPONS_LIST_QUERY_STRING } from './graphql/staking-coupons-list-query.graphql';
import { useGovernanceCost } from './use-governance-cost';

const STAKING_COUPONS = [
  {
    contract: 'ProfitDistributor3',
    lockPeriod: '3'
  },
  {
    contract: 'ProfitDistributor6',
    lockPeriod: '6'
  },
  {
    contract: 'ProfitDistributor12',
    lockPeriod: '12'
  }
];

const useStakingCouponsListQuery = () =>
  useLazyQuery<{ data?: StakingCouponsListQuery }>(config.API_URL ?? '', {
    query: STAKING_COUPONS_LIST_QUERY_STRING
  });

export const useStakingCoupons = () => {
  const networkConfig = useNetworkConfig();
  const { account = null, chainId } = useWeb3React();

  const stakingCouponsQuery = useStakingCouponsListQuery();

  const governanceInUSDC = useGovernanceCost();

  const stakingCoupons = useAsyncRetry(async () => {
    const stakingCouponsWithContractConfig = STAKING_COUPONS.map(
      ({ contract, lockPeriod }) => {
        const currentContract = networkConfig.contracts[contract];

        return {
          contract: currentContract,
          lockPeriod
        };
      }
    ).filter(({ contract }) => Boolean(contract));

    if (isEmpty(stakingCouponsWithContractConfig)) return [];

    const { data } = await stakingCouponsQuery(
      {
        filter: {
          address: stakingCouponsWithContractConfig.map(({ contract }) =>
            contract.address.toLowerCase()
          )
        },
        userFilter: account ? { address: [account] } : undefined
      },
      {
        init: {
          headers: {
            'chain-id': chainId
          }
        }
      }
    );

    if (!data?.profitDistributorList) return [];

    return data.profitDistributorList.map((couponsItem) => {
      const stakingCouponsConfig = stakingCouponsWithContractConfig.find(
        ({ contract }) => contract.address.toLowerCase() === couponsItem.address
      );

      return {
        ...couponsItem,
        ...stakingCouponsConfig,
        rewardToken: {
          ...couponsItem.rewardToken,
          symbol: 'BAG'
        }
      };
    });
  }, [networkConfig, account, chainId]);

  const stakingCouponsReward = useMemo(
    () =>
      stakingCoupons.value?.reduce(
        (sum, { userList }) => {
          const [reward = undefined] = userList ?? [];

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
    [stakingCoupons.value, governanceInUSDC]
  );

  return {
    stakingCoupons,
    stakingCouponsReward,
    governanceInUSDC
  };
};
