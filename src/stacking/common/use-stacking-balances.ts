import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Web3 from 'web3';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import { useNetworkConfig, useStackingContract, useUpdate } from 'src/common';

export type StackingToken = {
  amount: string;
  name: string;
  reward: string;
  delta: string;
  key: string;
};

export const useStackingBalances = (availableTokens: string[]) => {
  const tokens = useRef(availableTokens);
  const [stackingBalances, setStackingBalances] = useState<StackingToken[]>([]);
  const stackingContract = useStackingContract();
  const { account } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();
  const [update, handleUpdate] = useUpdate();

  const handleGetBalances = useCallback(async () => {
    const balances = tokens.current.reduce<Promise<StackingToken[]>>(
      async (previusPromise, key) => {
        const acc = await previusPromise;

        const tokenConfig = networkConfig.assets[key];

        if (!tokenConfig) return acc;

        const balance = account
          ? await stackingContract.methods
              .balances(account, tokenConfig.address)
              .call()
          : { amount: '1' };

        const amount = new BN(balance.amount);
        const reward = await stackingContract.methods
          .reward(tokenConfig.address)
          .call(account ? { from: account } : undefined);
        const rewards = await stackingContract.methods
          .rewards(tokenConfig.address)
          .call();

        const rewardBN = new BN(reward);

        const delta = new BN(rewards.delta);

        const stackingToken = {
          amount: amount.div(new BN(10).pow(tokenConfig.decimals)).toString(10),
          name: tokenConfig.symbol,
          key,
          reward: rewardBN
            .div(new BN(10).pow(tokenConfig.decimals))
            .toString(10),
          delta: delta.div(new BN(10).pow(tokenConfig.decimals)).toString(10)
        };

        acc.push(stackingToken);

        return acc;
      },
      Promise.resolve([])
    );

    const tokenBalances = await balances;

    if (tokenBalances.length) setStackingBalances(tokenBalances);
  }, [stackingContract, account, networkConfig]);

  useEffect(() => {
    handleGetBalances();
  }, [handleGetBalances, update]);

  useInterval(() => {
    handleGetBalances();
  }, 15000);

  return useMemo(
    (): [StackingToken[], () => void] => [stackingBalances, handleUpdate],
    [stackingBalances, handleUpdate]
  );
};
