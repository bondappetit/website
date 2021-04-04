import { useMemo } from 'react';
import { Network, useNetworkConfig } from './common';

export type StakingConfig = {
  contractName: string;
  tokenName: string;
  token: string[];
  liquidityPool: boolean;
};

const Gov = 'BAG';

const Stable = 'USDap';

const USDC = 'USDC';

const USDN = 'USDN';

// const ETH = 'ETH';

const LP = 'UNI-V2';

const getStakingAddress = (
  networkConfig: Network,
  contractName: string
): string | undefined => networkConfig.contracts[contractName]?.address;

const config = [
  // {
  //   contractName: 'GovStaking',
  //   tokenName: Gov,
  //   token: [Gov],
  //   liquidityPool: false
  // },

  // {
  //   contractName: 'StableStaking',
  //   tokenName: Stable,
  //   token: [Stable],
  //   liquidityPool: false
  // },

  // {
  //   contractName: 'WethGovLPStaking',
  //   tokenName: LP,
  //   token: [Gov, ETH],
  //   liquidityPool: true
  // },

  // {
  //   contractName: 'UsdcStableLPStaking',
  //   tokenName: LP,
  //   token: [Stable, USDC],
  //   liquidityPool: true
  // },

  // {
  //   contractName: 'UsdnStableLPStaking',
  //   tokenName: LP,
  //   token: [Stable, USDN],
  //   liquidityPool: true
  // },

  // {
  //   contractName: 'GovStableLPStaking',
  //   tokenName: LP,
  //   token: [Stable, Gov],
  //   liquidityPool: true
  // }

  {
    contractName: 'UsdcStableLPLockStaking',
    tokenName: LP,
    token: [Stable, USDC],
    liquidityPool: true
  },

  {
    contractName: 'UsdnStableLPLockStaking',
    tokenName: LP,
    token: [Stable, USDN],
    liquidityPool: true
  },

  {
    contractName: 'UsdcGovLPStaking',
    tokenName: LP,
    token: [Gov, USDC],
    liquidityPool: true
  },

  {
    contractName: 'UsdnGovLPStaking',
    tokenName: LP,
    token: [Gov, USDN],
    liquidityPool: true
  }
];

const getStakingConfig = (
  networkConfig: Network
): Record<string, StakingConfig> => {
  return config.reduce<Record<string, StakingConfig>>((acc, configItem) => {
    const address = getStakingAddress(networkConfig, configItem.contractName);

    if (address) {
      acc[address] = configItem;
    }

    return acc;
  }, {});
};

export const useStakingConfig = () => {
  const networkConfig = useNetworkConfig();

  return useMemo(() => getStakingConfig(networkConfig), [networkConfig]);
};
