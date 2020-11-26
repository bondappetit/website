import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import BN from 'bignumber.js';

import { useNetworkConfig, useStackingContract } from 'src/common';

export type StackingToken = {
  amount?: string;
  name: string;
  reward?: string;
  delta?: string;
};

export const useStackingBalances = (availableTokens: string[]) => {
  const [stackingBalances, setStackingBalances] = useState<StackingToken[]>([]);
  const stackingContract = useStackingContract();
  const { account } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();

  const handleGetBalances = useCallback(async () => {
    if (!account || !networkConfig) return;

    const balances = availableTokens.reduce<Promise<StackingToken[]>>(
      async (previusPromise, token) => {
        const acc = await previusPromise;

        const tokenConfig = networkConfig?.assets[token];

        if (!tokenConfig) return acc;

        const balance = await stackingContract?.methods
          .balances(account, tokenConfig.address)
          .call();

        const amount = balance ? new BN(balance.amount) : null;
        const reward = await stackingContract?.methods
          .reward(tokenConfig.address)
          .call();
        const rewards = await stackingContract?.methods
          .rewards(tokenConfig.address)
          .call();

        const rewardBN = reward ? new BN(reward) : null;

        const delta = rewards ? new BN(rewards.delta) : null;

        const stackingToken = {
          amount: amount?.div(new BN(10).pow(tokenConfig.decimals)).toString(),
          name: token,
          reward: rewardBN
            ?.div(new BN(10).pow(tokenConfig.decimals))
            .toString(),
          delta: delta?.div(new BN(10).pow(tokenConfig.decimals)).toString(10)
        };

        acc.push(stackingToken);

        return acc;
      },
      Promise.resolve([])
    );

    setStackingBalances(await balances);
  }, [stackingContract, account, networkConfig, availableTokens]);

  useEffect(() => {
    handleGetBalances();
  }, [handleGetBalances]);

  return useMemo(() => stackingBalances, [stackingBalances]);
};
