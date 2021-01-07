import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import {
  useNetworkConfig,
  useGovStackingContract,
  useStableStackingContract,
  useGovernanceContract,
  useInvestmentContract,
  useStableCoinContract
} from 'src/common';
import { Balance } from './monitor-contract-list.types';

export const useInvestStackingBalance = (): Balance[] | null => {
  const [investStackingBalance, setInvestStackingBalance] = useState<
    Balance[] | null
  >(null);
  const networkConfig = useNetworkConfig();

  const stackingGovContract = useGovStackingContract();
  const stackingStableContract = useStableStackingContract();
  const governanceContract = useGovernanceContract();
  const stableCoinContract = useStableCoinContract();
  const investmentContract = useInvestmentContract();

  const handleLoadInvestStackingBalance = useCallback(async () => {
    const balanceConfig = [
      {
        name: 'Investment BAG',
        decimals: networkConfig.assets.Governance.decimals,
        balanceOf: governanceContract.methods.balanceOf(
          investmentContract.options.address
        )
      },
      {
        name: 'Stacking BAG',
        decimals: networkConfig.assets.Governance.decimals,
        balanceOf: governanceContract.methods.balanceOf(
          stackingGovContract.options.address
        )
      },
      {
        name: 'Stacking USDp',
        decimals: networkConfig.assets.Stable.decimals,
        balanceOf: stableCoinContract.methods.balanceOf(
          stackingStableContract.options.address
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
    stackingGovContract,
    stackingStableContract,
    governanceContract,
    investmentContract,
    networkConfig,
    stableCoinContract
  ]);

  useEffect(() => {
    handleLoadInvestStackingBalance();
  }, [handleLoadInvestStackingBalance]);

  useInterval(() => {
    handleLoadInvestStackingBalance();
  }, 15000);

  return investStackingBalance;
};
