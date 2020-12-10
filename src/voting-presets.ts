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

export const VOTING_PRESETS: VotingPreset[] = [
  {
    title: 'Template name',
    description: `Riffle dace southern smelt herring smelt sand tilefish, "barreleye South American Lungfish."
    Yellowbelly tail catfish sharksucker, searobin galjoen fish loach goby, char.`,
    variables: {
      amount: {
        type: 'uint256',
        default: '100'
      },
      account: {
        type: 'address',
        default: ''
      },
      date: {
        type: 'date',
        default: ''
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
            value: '0x40276A78FfE77102757762108e8810eF333200fb'
          },
          {
            variable: false,
            type: 'address',
            value: '0x016a1eDDB690C207fc47A8e800d1bD399BFaB417'
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      },
      {
        contract: 'Bond',
        method: 'approve',
        input: [
          {
            variable: false,
            type: 'address',
            value: '0x1809734e462d626379f2A3E85c92A51b4Ed581d7'
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          }
        ]
      },
      {
        contract: 'Vesting',
        method: 'lock',
        input: [
          {
            variable: true,
            type: 'address',
            value: 'account'
          },
          {
            variable: true,
            type: 'uint256',
            value: 'amount'
          },
          {
            variable: true,
            type: 'uint256',
            value: 'date'
          }
        ]
      }
    ]
  }
];
