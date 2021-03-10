import { useAsyncRetry } from 'react-use';

import {
  useNetworkConfig,
  useGovernanceContract,
  useStableCoinContract,
  useTimeoutInterval
} from 'src/common';

export const useInvestStakingBalance = () => {
  const networkConfig = useNetworkConfig();
  const governanceContract = useGovernanceContract();
  const stableCoinContract = useStableCoinContract();

  const state = useAsyncRetry(async () => {
    const balanceConfig = [
      {
        name: 'Staking BAG',
        decimals: networkConfig.assets.Governance.decimals
      },
      {
        name: 'Staking USDap',
        decimals: networkConfig.assets.Stable.decimals
      }
    ];

    const balances = balanceConfig.map(async (config) => {
      return {
        name: config.name,
        balance: null
      };
    });

    return Promise.all(balances);
  }, [governanceContract, networkConfig, stableCoinContract]);

  useTimeoutInterval(state.retry, 15000);

  return state;
};
