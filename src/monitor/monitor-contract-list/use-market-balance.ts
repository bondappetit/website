import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import {
  useNetworkConfig,
  useBondContract,
  useABTTokenContract,
  useMarketContract
} from 'src/common';
import { Balance } from './monitor-contract-list.types';

export const useMarketBalance = (): Balance[] | null => {
  const [marketBalances, setMarketBalances] = useState<Balance[] | null>(null);

  const networkConfig = useNetworkConfig();
  const bondContract = useBondContract();
  const abtContract = useABTTokenContract();
  const marketContract = useMarketContract();

  const handleLoadMarketBalances = useCallback(async () => {
    if (!marketContract || !abtContract || !bondContract || !networkConfig)
      return;

    const balanceConfig = [
      {
        name: 'Market abt balance',
        decimals: networkConfig.assets.ABT.decimals,
        balanceOf: abtContract.methods.balanceOf(marketContract.options.address)
      },
      {
        name: 'Market bond balance',
        decimals: networkConfig.assets.Bond.decimals,
        balanceOf: bondContract.methods.balanceOf(
          marketContract.options.address
        )
      }
    ];

    const balances = balanceConfig.map(async (config) => {
      const balance = await config.balanceOf.call();

      return {
        name: config.name,
        balance: new BN(balance).div(new BN(10).pow(config.decimals))
      };
    });

    setMarketBalances(await Promise.all(balances));
  }, [networkConfig, abtContract, bondContract, marketContract]);

  useEffect(() => {
    handleLoadMarketBalances();
  }, [handleLoadMarketBalances]);

  useInterval(() => {
    handleLoadMarketBalances();
  }, 15000);

  return marketBalances;
};
