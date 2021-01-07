import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Web3 from 'web3';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import { useNetworkConfig, useUpdate } from 'src/common';
import { useStackingContracts } from './use-stacking-contracts';

export type StackingToken = {
  amount: string;
  name: string;
  totalSupply: string;
  rewardRate: string;
  reward: string;
  key: string;
};

export const useStackingBalances = (availableTokens: string[]) => {
  const tokens = useRef(availableTokens);
  const [stackingBalances, setStackingBalances] = useState<StackingToken[]>([]);
  const getContract = useStackingContracts();
  const { account } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();
  const [update, handleUpdate] = useUpdate();

  const handleGetBalances = useCallback(async () => {
    const balances = tokens.current.reduce<Promise<StackingToken[]>>(
      async (previusPromise, key) => {
        const acc = await previusPromise;

        const tokenConfig = networkConfig.assets[key];

        const stackingContract = getContract(key);

        if (!tokenConfig || !stackingContract) return acc;

        const balance = account
          ? await stackingContract.methods.balanceOf(account).call()
          : '1';

        const amount = new BN(balance);
        const reward = account
          ? await stackingContract.methods
              .earned(account)
              .call({ from: account })
          : '0';

        const totalSupply = await stackingContract.methods.totalSupply().call();

        const rewardRate = await stackingContract.methods.rewardRate().call();

        const rewardBN = new BN(reward);

        const stackingToken = {
          amount: amount.div(new BN(10).pow(tokenConfig.decimals)).toString(10),
          name: tokenConfig.symbol,
          key,
          totalSupply,
          rewardRate,
          reward: rewardBN
            .div(new BN(10).pow(tokenConfig.decimals))
            .toString(10)
        };

        acc.push(stackingToken);

        return acc;
      },
      Promise.resolve([])
    );

    const tokenBalances = await balances;

    if (tokenBalances.length) setStackingBalances(tokenBalances);
  }, [account, networkConfig, getContract]);

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
