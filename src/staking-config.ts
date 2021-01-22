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

const ETH = 'ETH';

const LP = 'UNI-V2';

export const STAKING_CONFIG: StakingConfig[] = [
  {
    contractName: 'GovStaking',
    tokenName: Gov,
    token: [Gov],
    liquidityPool: false
  },
  {
    contractName: 'StableStaking',
    tokenName: Stable,
    token: [Stable],
    liquidityPool: false
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
  },
  {
    contractName: 'WethGovLPStaking',
    tokenName: LP,
    token: [Gov, ETH],
    liquidityPool: true
  },
  {
    contractName: 'UsdcStableLPStaking',
    tokenName: LP,
    token: [Stable, USDC],
    liquidityPool: true
  },
  {
    contractName: 'UsdnStableLPStaking',
    tokenName: LP,
    token: [Stable, USDN],
    liquidityPool: true
  },
  {
    contractName: 'GovStableLPStaking',
    tokenName: LP,
    token: [Stable, Gov],
    liquidityPool: true
  }
];
