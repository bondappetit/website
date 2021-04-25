import { useMemo } from 'react';
import { Network, useNetworkConfig } from './common';

export type StakingConfig = {
  contractName: string;
  tokenName: string;
  token: string[];
  liquidityPool: boolean;
  configAddress: string;
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
      const lowerAddress = address.toLowerCase();

      acc[lowerAddress] = {
        ...configItem,
        configAddress: lowerAddress
      };
    }

    return acc;
  }, {});
};

export const useStakingConfig = (length?: number) => {
  const networkConfig = useNetworkConfig();

  const stakingConfig = useMemo(() => getStakingConfig(networkConfig), [
    networkConfig
  ]);

  const stakingConfigValues = useMemo(() => {
    const values = Object.values(stakingConfig);

    return !length ? values : values.slice(0, 4);
  }, [stakingConfig, length]);

  return useMemo(() => ({ stakingConfigValues, stakingConfig }), [
    stakingConfigValues,
    stakingConfig
  ]);
};
