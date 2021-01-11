import { useNetworkConfig } from './common/use-network-config';

export type VotingPresetVariables = {
  [key: string]: {
    type: string;
    default: string;
  };
};

export type VotingPresetInput = {
  variable: boolean;
  type: string;
  value: string;
};

export type VotingPresetAction = {
  contract: string;
  method: string;
  input: VotingPresetInput[];
};

export type VotingPreset = {
  title: string;
  description: string;
  variables: VotingPresetVariables;
  actions: VotingPresetAction[];
};

export const getVotingPresets = (
  networkConfig: ReturnType<typeof useNetworkConfig>
): VotingPreset[] => [
  {
    title: 'Treasury: transfer BAG',
    description: 'Transfer BAG token from Treasury contract',
    variables: {
      recipient: {
        type: 'address',
        default: ''
      },
      amount: {
        type: 'uint256',
        default: '1000000000000000000'
      }
    },
    actions: [
      {
        contract: 'Treasury',
        method: 'transfer',
        input: [
          {
            variable: false,
            type: 'address',
            value: networkConfig.assets.Governance.address
          },
          {
            variable: true,
            type: 'address',
            value: 'recipient'
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      }
    ]
  },
  {
    title: 'Treasury: transfer USDp',
    description: 'Transfer USDp token from Treasury contract',
    variables: {
      recipient: {
        type: 'address',
        default: ''
      },
      amount: {
        type: 'uint256',
        default: '1000000000000000000'
      }
    },
    actions: [
      {
        contract: 'Treasury',
        method: 'transfer',
        input: [
          {
            variable: false,
            type: 'address',
            value: networkConfig.assets.Stable.address
          },
          {
            variable: true,
            type: 'address',
            value: 'recipient'
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      }
    ]
  },
  {
    title: 'Issuer: burn USDp',
    description:
      'Transfer USDp token from Treasury to Issuer contract and call rebalance',
    variables: {
      amount: {
        type: 'uint256',
        default: '1000000000000000000'
      }
    },
    actions: [
      {
        contract: 'Treasury',
        method: 'transfer',
        input: [
          {
            variable: false,
            type: 'address',
            value: networkConfig.assets.Stable.address
          },
          {
            variable: true,
            type: 'address',
            value: networkConfig.contracts.Issuer.address
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      },
      {
        contract: 'Issuer',
        method: 'rebalance',
        input: []
      }
    ]
  },
  {
    title: 'Market: transfer USDp from Treasury',
    description: 'Transfer USDp token from Treasury to Market contract',
    variables: {
      amount: {
        type: 'uint256',
        default: '1000000000000000000'
      }
    },
    actions: [
      {
        contract: 'Treasury',
        method: 'transfer',
        input: [
          {
            variable: false,
            type: 'address',
            value: networkConfig.assets.Stable.address
          },
          {
            variable: true,
            type: 'address',
            value: networkConfig.contracts.Market.address
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      }
    ]
  },
  {
    title: 'Market: transfer USDC to Treasury',
    description: 'Transfer USDC token from Market contract to Treasury',
    variables: {
      amount: {
        type: 'uint256',
        default: '1000000000000000000'
      }
    },
    actions: [
      {
        contract: 'Market',
        method: 'transfer',
        input: [
          {
            variable: false,
            type: 'address',
            value: networkConfig.assets.USDC.address
          },
          {
            variable: true,
            type: 'address',
            value: networkConfig.contracts.Treasury.address
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      }
    ]
  },
  {
    title: 'Staking: transfer reward to GovStaking',
    description: 'Transfer rewards token to Governance Staking contract',
    variables: {
      amount: {
        type: 'uint256',
        default: '1000000000000000000'
      }
    },
    actions: [
      {
        contract: 'Treasury',
        method: 'transfer',
        input: [
          {
            variable: false,
            type: 'address',
            value: networkConfig.assets.Governance.address
          },
          {
            variable: false,
            type: 'address',
            value: networkConfig.contracts.GovStaking.address
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      },
      {
        contract: 'GovStaking',
        method: 'notifyRewardAmount',
        input: [
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      }
    ]
  },
  {
    title: 'Staking: transfer reward to StableStaking',
    description: 'Transfer rewards token to Stable Staking contract',
    variables: {
      amount: {
        type: 'uint256',
        default: '1000000000000000000'
      }
    },
    actions: [
      {
        contract: 'Treasury',
        method: 'transfer',
        input: [
          {
            variable: false,
            type: 'address',
            value: networkConfig.assets.Governance.address
          },
          {
            variable: false,
            type: 'address',
            value: networkConfig.contracts.StableStaking.address
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      },
      {
        contract: 'StableStaking',
        method: 'notifyRewardAmount',
        input: [
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      }
    ]
  }
];
