import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';

import {
  useNetworkConfig,
  useStackingContract,
  useBondContract,
  useInvestmentContract
} from 'src/common';
import { Balance } from './monitor-contract-list.types';

export const useInvestStackingBalance = (): [Balance[] | null, () => void] => {
  const [investStackingBalance, setInvestStackingBalance] = useState<
    Balance[] | null
  >(null);
  const networkConfig = useNetworkConfig();

  const stackingContract = useStackingContract();
  const bondContract = useBondContract();
  const investmentContract = useInvestmentContract();

  const handleLoadInvestStackingBalance = useCallback(async () => {
    if (
      !bondContract ||
      !stackingContract ||
      !investmentContract ||
      !networkConfig
    )
      return;

    const balanceConfig = [
      {
        name: 'Investment',
        address: investmentContract.options.address
      },
      {
        name: 'Stacking',
        address: stackingContract.options.address
      }
    ];

    const balances = balanceConfig.map(async (config) => {
      const balance = await bondContract.methods
        .balanceOf(config.address)
        .call();

      return {
        name: config.name,
        balance: new BN(balance).div(
          new BN(10).pow(networkConfig.assets.Bond.decimals)
        )
      };
    });

    setInvestStackingBalance(await Promise.all(balances));
  }, [stackingContract, bondContract, investmentContract, networkConfig]);

  useEffect(() => {
    handleLoadInvestStackingBalance();
  }, [handleLoadInvestStackingBalance]);

  return [investStackingBalance, handleLoadInvestStackingBalance];
};
