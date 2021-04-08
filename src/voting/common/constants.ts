import { StatusProps } from 'src/common';

export enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed
}

export const ProposalStateColors: Record<string, StatusProps['color']> = {
  [ProposalState.Pending]: 'grey',
  [ProposalState.Active]: 'blue',
  [ProposalState.Defeated]: 'red',
  [ProposalState.Canceled]: 'orange',
  [ProposalState.Succeeded]: 'green',
  [ProposalState.Queued]: 'purple',
  [ProposalState.Executed]: 'green',
  [ProposalState.Expired]: 'green'
};

export const FACTOID = [
  {
    percent: '20%',
    text: `BondAppétit team & future team members, subject to 4-year vesting;`
  },
  {
    percent: '14%',
    text: `to BondAppétit founders, subject to 18 - months moratorium on sale;`
  },
  {
    percent: '1%',
    text: `to the pre-launch investor.`
  }
];

export const DECISION_MAKING = [
  {
    title: 'Protocol’s Management',
    text: [
      'Add a new asset type (collateral) to the basket;',
      'Add a new asset type to the Price Oracle;',
      'Whitelist a new Depository smart contract;',
      'Start emergency shutdown procedure;',
      'Add new markets for automatic exchange of USDap.'
    ]
  },
  {
    title: 'Protocol’s assets liquidity',
    text: [
      'Change in the reward rates for participation in liquidity pools;',
      'Choose the profit distribution of the protocol;',
      'Change of the list of assets available for exchange for USDap.'
    ]
  },
  {
    title: 'Development of the protocol',
    text: [
      'Proposal and voting on new features of the protocol;',
      'Change the rate of technical costs for the maintenance of the protocol;',
      'Initiate additional capitalization of the protocol;',
      'Apply changes to current smart contracts.'
    ]
  }
];
