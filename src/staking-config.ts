import { useMemo } from 'react';
import { Network, useNetworkConfig } from './common';

export type StakingConfig = {
  contractName: string;
  tokenName: string;
  token: string[];
  liquidityPool: boolean;
};

const Gov = 'BAG';

const Stable = 'USDp';

const USDC = 'USDC';

const USDN = 'USDN';

// const ETH = 'ETH';

const LP = 'UNI-V2';

const getStakingAddress = (networkConfig: Network, contractName: string) =>
  networkConfig.contracts[contractName].address;

const getStakingConfig = (
  networkConfig: Network
): Record<string, StakingConfig> => ({
  // [getStakingAddress(networkConfig, 'GovStaking')]: {
  //   contractName: 'GovStaking',
  //   tokenName: Gov,
  //   token: [Gov],
  //   liquidityPool: false
  // },

  // [getStakingAddress(networkConfig, 'StableStaking')]: {
  //   contractName: 'StableStaking',
  //   tokenName: Stable,
  //   token: [Stable],
  //   liquidityPool: false
  // },

  [getStakingAddress(networkConfig, 'UsdcGovLPStaking')]: {
    contractName: 'UsdcGovLPStaking',
    tokenName: LP,
    token: [Gov, USDC],
    liquidityPool: true
  },

  // [getStakingAddress(networkConfig, 'UsdnGovLPStaking')]: {
  //   contractName: 'UsdnGovLPStaking',
  //   tokenName: LP,
  //   token: [Gov, USDN],
  //   liquidityPool: true
  // },

  // [getStakingAddress(networkConfig, 'WethGovLPStaking')]: {
  //   contractName: 'WethGovLPStaking',
  //   tokenName: LP,
  //   token: [Gov, ETH],
  //   liquidityPool: true
  // },

  // [getStakingAddress(networkConfig, 'UsdcStableLPStaking')]: {
  //   contractName: 'UsdcStableLPStaking',
  //   tokenName: LP,
  //   token: [Stable, USDC],
  //   liquidityPool: true
  // },

  // [getStakingAddress(networkConfig, 'UsdnStableLPStaking')]: {
  //   contractName: 'UsdnStableLPStaking',
  //   tokenName: LP,
  //   token: [Stable, USDN],
  //   liquidityPool: true
  // },

  // [getStakingAddress(networkConfig, 'GovStableLPStaking')]: {
  //   contractName: 'GovStableLPStaking',
  //   tokenName: LP,
  //   token: [Stable, Gov],
  //   liquidityPool: true
  // }

  [getStakingAddress(networkConfig, 'UsdcStableLPLockStaking')]: {
    contractName: 'UsdcStableLPLockStaking',
    tokenName: LP,
    token: [Stable, USDC],
    liquidityPool: true
  },

  [getStakingAddress(networkConfig, 'UsdnStableLPLockStaking')]: {
    contractName: 'UsdnStableLPLockStaking',
    tokenName: LP,
    token: [Stable, USDN],
    liquidityPool: true
  }
});

export const useStakingConfig = () => {
  const networkConfig = useNetworkConfig();

  return useMemo(() => getStakingConfig(networkConfig), [networkConfig]);
};
