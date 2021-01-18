import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import {
  useNetworkConfig,
  useGovStakingContract,
  useStableStakingContract,
  useGovernanceContract,
  useInvestmentContract,
  useStableCoinContract
} from 'src/common';
import { Balance } from './monitor-contract-list.types';

export const useInvestStakingBalance = (): Balance[] | null => {
  const [investStakingBalance, setinvestStakingBalance] = useState<
    Balance[] | null
  >(null);
  const networkConfig = useNetworkConfig();

  const stakingGovContract = useGovStakingContract();
  const stakingStableContract = useStableStakingContract();
  const governanceContract = useGovernanceContract();
  const stableCoinContract = useStableCoinContract();
  const investmentContract = useInvestmentContract();

  const handleLoadinvestStakingBalance = useCallback(async () => {
    const balanceConfig = [
      {
        name: 'Investment BAG',
        decimals: networkConfig.assets.Governance.decimals,
        balanceOf: governanceContract.methods.balanceOf(
          investmentContract.options.address
        )
      },
      {
        name: 'Staking BAG',
        decimals: networkConfig.assets.Governance.decimals,
        balanceOf: governanceContract.methods.balanceOf(
          stakingGovContract.options.address
        )
      },
      {
        name: 'Staking USDp',
        decimals: networkConfig.assets.Stable.decimals,
        balanceOf: stableCoinContract.methods.balanceOf(
          stakingStableContract.options.address
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

    setinvestStakingBalance(await Promise.all(balances));
  }, [
    stakingGovContract,
    stakingStableContract,
    governanceContract,
    investmentContract,
    networkConfig,
    stableCoinContract
  ]);

  useEffect(() => {
    handleLoadinvestStakingBalance();
  }, [handleLoadinvestStakingBalance]);

  useInterval(() => {
    handleLoadinvestStakingBalance();
  }, 15000);

  return investStakingBalance;
};