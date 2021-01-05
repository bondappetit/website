import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import {
  useNetworkConfig,
  useGovernanceContract,
  useStableCoinContract,
  useMarketContract
} from 'src/common';
import { Balance } from './monitor-contract-list.types';

export const useMarketBalance = (): Balance[] | null => {
  const [marketBalances, setMarketBalances] = useState<Balance[] | null>(null);

  const networkConfig = useNetworkConfig();
  const governanceContract = useGovernanceContract();
  const stableCoinContract = useStableCoinContract();
  const marketContract = useMarketContract();

  const handleLoadMarketBalances = useCallback(async () => {
    const balanceConfig = [
      {
        name: 'Market USDp balance',
        decimals: networkConfig.assets.Stable.decimals,
        balanceOf: stableCoinContract.methods.balanceOf(
          marketContract.options.address
        )
      },
      {
        name: 'Market BAG balance',
        decimals: networkConfig.assets.Governance.decimals,
        balanceOf: governanceContract.methods.balanceOf(
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
  }, [networkConfig, stableCoinContract, governanceContract, marketContract]);

  useEffect(() => {
    handleLoadMarketBalances();
  }, [handleLoadMarketBalances]);

  useInterval(() => {
    handleLoadMarketBalances();
  }, 15000);

  return marketBalances;
};
