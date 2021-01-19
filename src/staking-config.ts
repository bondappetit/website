export type StakingConfig = {
  contractName: string;
  token: string[];
};

const Gov = 'BAG';

const Stable = 'USDp';

const USDC = 'USDC';

export const STAKING_CONFIG: StakingConfig[] = [
  {
    contractName: 'GovStaking',
    token: [Gov]
  },
  {
    contractName: 'StableStaking',
    token: [Stable]
  },
  {
    contractName: 'UsdcGovLPStaking',
    token: [Gov, USDC]
  },
  {
    contractName: 'UsdcStableLPStaking',
    token: [Stable, USDC]
  },
  {
    contractName: 'GovStableLPStaking',
    token: [Gov]
  }
];
