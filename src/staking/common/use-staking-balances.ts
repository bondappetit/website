import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useUpdate, BN, useTimeoutInterval } from 'src/common';
import type { Staking } from 'src/generate/Staking';
import { StakingConfig } from 'src/staking-config';
import { useStakingContracts } from './use-staking-contracts';
import { useTokenContracts } from './use-token-contract';

export type StakingToken = {
  amount: BN;
  totalSupply: BN;
  rewardRate: string;
  reward: BN;
  key: string;
  decimals: string;
  address: string;
  stakingContract: Staking;
  token: string[];
  liquidityPool: boolean;
  poolRate: BN;
};

const BLOCKS_PER_MINUTE = 4;

export const useStakingBalances = (availableTokens: StakingConfig[]) => {
  const tokens = useRef(availableTokens);
  const [stakingBalances, setStakingBalances] = useState<StakingToken[]>([]);
  const getStakingContract = useStakingContracts();
  const getTokenContract = useTokenContracts();
  const { account: web3Account } = useWeb3React<Web3>();
  const [account, setAccount] = useState(web3Account);
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

        const totalSupplyBN = new BN(totalSupply).div(new BN(10).pow(decimals));

        const poolRate = reward
          .multipliedBy(BLOCKS_PER_MINUTE)
          .multipliedBy(60)
          .multipliedBy(24)
          .multipliedBy(30);

        const StakingToken = {
          amount,
          key: String(index),
          decimals,
          totalSupply: totalSupplyBN,
          rewardRate,
          stakingContract,
          address: stakingTokenAddress,
          reward,
          token,
          liquidityPool,
          poolRate
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
    if (web3Account) {
      setAccount(web3Account);
    }
  }, [web3Account]);

  useEffect(() => {
    handleGetBalances();
  }, [handleGetBalances, update]);

  useTimeoutInterval(handleGetBalances, 15000);

  return useMemo(
    (): [StakingToken[], () => void] => [stakingBalances, handleUpdate],
    [stakingBalances, handleUpdate]
  );
};
