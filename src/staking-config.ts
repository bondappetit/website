import { useMemo } from 'react';
import networks from '@bondappetit/networks';

import { Network } from './common';
import { config } from './config';

export type StakingConfig = {
  contractName: string;
  tokenName: string;
  token: string[];
  liquidityPool: boolean;
  configAddress: string;
  networkName: string;
  chainId: number;
};

const Gov = 'BAG';
const GovBNB = 'bBAG';
const Stable = 'USDap';
const USDC = 'USDC';
const USDN = 'USDN';
const USDT = 'USDT';
// const ETH = 'ETH';
const LP = 'UNI-V2';
const BNB = 'BNB';

const stakingConfig = [
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
  // },

  {
    contractName: 'BnbGovLPStaking',
    tokenName: LP,
    chainId: config.CHAIN_BINANCE_IDS[0],
    token: [GovBNB, BNB],
    liquidityPool: true
  },

  {
    contractName: 'UsdcStableLPLockStaking',
    tokenName: LP,
    chainId: config.CHAIN_IDS[0],
    token: [Stable, USDC],
    liquidityPool: true
  },

  {
    contractName: 'UsdtGovLPStaking',
    tokenName: LP,
    chainId: config.CHAIN_IDS[0],
    token: [Gov, USDT],
    liquidityPool: true
  },

  {
    contractName: 'UsdnGovLPStaking',
    tokenName: LP,
    chainId: config.CHAIN_IDS[0],
    token: [Gov, USDN],
    liquidityPool: true
  },

  {
    contractName: 'UsdcGovLPStaking',
    tokenName: LP,
    chainId: config.CHAIN_IDS[0],
    token: [Gov, USDC],
    liquidityPool: true
  }
];

const chainContracts: Record<number, Network['contracts']> = {
  [config.CHAIN_IDS[0]]: networks.main.contracts,
  [config.CHAIN_BINANCE_IDS[0]]: networks.mainBSC.contracts
};

const getStakingAddress = (
  contracts: Network['contracts'],
  contractName: string
): string | undefined => contracts[contractName]?.address;

const getStakingConfig = (): Record<string, StakingConfig> => {
  return stakingConfig.reduce<Record<string, StakingConfig>>(
    (acc, configItem) => {
      const contracts = chainContracts[configItem.chainId];

      const address = getStakingAddress(contracts, configItem.contractName);

      if (address) {
        const lowerAddress = address.toLowerCase();

        acc[lowerAddress] = {
          ...configItem,
          configAddress: lowerAddress,
          networkName: 'networkConfig.networkName'
        };
      }

      return acc;
    },
    {}
  );
};

export const useStakingConfig = () => {
  const stakingConfigMemo = useMemo(() => getStakingConfig(), []);

  const stakingConfigValues = useMemo(() => {
    const values = Object.values(stakingConfigMemo);

    return values;
  }, [stakingConfigMemo]);

  return useMemo(
    () => ({ stakingConfigValues, stakingConfig: stakingConfigMemo }),
    [stakingConfigValues, stakingConfigMemo]
  );
};
