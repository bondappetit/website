import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Web3 from 'web3';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import { useUpdate } from 'src/common';
import { StakingConfig } from 'src/staking-config';
import { useStakingContracts } from './use-staking-contracts';
import { useTokenContracts } from './use-token-contract';

export type StakingToken = {
  amount: string;
  totalSupply: string;
  rewardRate: string;
  reward: string;
  key: string;
  decimals: string;
  address: string;
  contractName: string;
  token: string[];
  liquidityPool: boolean;
};

export const useStakingBalances = (availableTokens: StakingConfig[]) => {
  const tokens = useRef(availableTokens);
  const [stakingBalances, setStakingBalances] = useState<StakingToken[]>([]);
  const getStakingContract = useStakingContracts();
  const getTokenContract = useTokenContracts();
  const { account } = useWeb3React<Web3>();
  const [update, handleUpdate] = useUpdate();

  const handleGetBalances = useCallback(async () => {
    const balances = tokens.current.reduce<Promise<StakingToken[]>>(
      async (previusPromise, { contractName, token, liquidityPool }, index) => {
        const acc = await previusPromise;

        const stakingContract = getStakingContract(contractName);

        const stakingTokenAddress = await stakingContract.methods
          .stakingToken()
          .call();
        const stakingTokenContract = getTokenContract(stakingTokenAddress);

        const decimals = await stakingTokenContract.methods.decimals().call();

        if (!stakingContract) return acc;

        const [balance, earned, totalSupply, rewardRate] = await Promise.all([
          account ? stakingContract.methods.balanceOf(account).call() : '0',
          account
            ? stakingContract.methods.earned(account).call({ from: account })
            : '0',
          stakingContract.methods.totalSupply().call(),
          stakingContract.methods.rewardRate().call()
        ]);

        const amount = new BN(balance).div(new BN(10).pow(decimals));

        const reward = new BN(earned).div(new BN(10).pow(decimals));

        const StakingToken = {
          amount: amount.isNaN() ? '0' : amount.toString(10),
          key: String(index),
          decimals,
          totalSupply,
          rewardRate,
          contractName,
          address: stakingTokenAddress,
          reward: reward.isNaN() ? '0' : reward.toString(10),
          token,
          liquidityPool
        };

        acc.push(StakingToken);

        return acc;
      },
      Promise.resolve([])
    );

    const tokenBalances = await balances;

    if (tokenBalances.length) setStakingBalances(tokenBalances);
  }, [account, getStakingContract, getTokenContract]);

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
