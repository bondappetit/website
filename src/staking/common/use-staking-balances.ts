import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Web3 from 'web3';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import { useNetworkConfig, useUpdate } from 'src/common';
import { useStakingContracts } from './use-staking-contracts';

export type StakingToken = {
  amount: string;
  name: string;
  totalSupply: string;
  rewardRate: string;
  reward: string;
  key: string;
};

export const useStakingBalances = (availableTokens: string[]) => {
  const tokens = useRef(availableTokens);
  const [stakingBalances, setStakingBalances] = useState<StakingToken[]>([]);
  const getContract = useStakingContracts();
  const { account } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();
  const [update, handleUpdate] = useUpdate();

  const handleGetBalances = useCallback(async () => {
    const balances = tokens.current.reduce<Promise<StakingToken[]>>(
      async (previusPromise, key) => {
        const acc = await previusPromise;

        const tokenConfig = networkConfig.assets[key];

        const stakingContract = getContract(key);

        if (!tokenConfig || !stakingContract) return acc;

        const [balance, earned, totalSupply, rewardRate] = await Promise.all([
          account ? stakingContract.methods.balanceOf(account).call() : '0',
          account
            ? stakingContract.methods.earned(account).call({ from: account })
            : '0',
          stakingContract.methods.totalSupply().call(),
          stakingContract.methods.rewardRate().call()
        ]);

        const amount = new BN(balance).div(
          new BN(10).pow(tokenConfig.decimals)
        );

        const reward = new BN(earned).div(new BN(10).pow(tokenConfig.decimals));

        const StakingToken = {
          amount: amount.isNaN() ? '0' : amount.toString(10),
          name: tokenConfig.symbol,
          key,
          totalSupply,
          rewardRate,
          reward: reward.isNaN() ? '0' : reward.toString(10)
        };

        acc.push(StakingToken);

        return acc;
      },
      Promise.resolve([])
    );

    const tokenBalances = await balances;

    if (tokenBalances.length) setStakingBalances(tokenBalances);
  }, [account, networkConfig, getContract]);

  useEffect(() => {
    handleGetBalances();
  }, [handleGetBalances, update]);

  useInterval(() => {
    handleGetBalances();
  }, 15000);

  return useMemo(
    (): [StakingToken[], () => void] => [stakingBalances, handleUpdate],
    [stakingBalances, handleUpdate]
  );
};
