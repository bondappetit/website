import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import {
  useNetworkConfig,
  useStackingContract,
  useBondContract,
  useInvestmentContract,
  useABTTokenContract
} from 'src/common';
import { Balance } from './monitor-contract-list.types';

export const useInvestStackingBalance = (): Balance[] | null => {
  const [investStackingBalance, setInvestStackingBalance] = useState<
    Balance[] | null
  >(null);
  const networkConfig = useNetworkConfig();

  const stackingContract = useStackingContract();
  const bondContract = useBondContract();
  const abtContract = useABTTokenContract();
  const investmentContract = useInvestmentContract();

  const handleLoadInvestStackingBalance = useCallback(async () => {
    const balanceConfig = [
      {
        name: 'Investment BAG',
        decimals: networkConfig.assets.Bond.decimals,
        balanceOf: bondContract.methods.balanceOf(
          investmentContract.options.address
        )
      },
      {
        name: 'Stacking BAG',
        decimals: networkConfig.assets.Bond.decimals,
        balanceOf: bondContract.methods.balanceOf(
          stackingContract.options.address
        )
      },
      {
        name: 'Stacking USDp',
        decimals: networkConfig.assets.ABT.decimals,
        balanceOf: abtContract.methods.balanceOf(
          stackingContract.options.address
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

    setInvestStackingBalance(await Promise.all(balances));
  }, [
    stackingContract,
    bondContract,
    investmentContract,
    networkConfig,
    abtContract
  ]);

  useEffect(() => {
    handleLoadInvestStackingBalance();
  }, [handleLoadInvestStackingBalance]);

  useInterval(() => {
    handleLoadInvestStackingBalance();
  }, 15000);

  return investStackingBalance;
};
