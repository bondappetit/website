import { config } from 'src/config';

export const STEPS = [
  {
    title: 'Protocol launch',
    body:
      'Stake stablecoins in early stage and earn more BAG as staking rewards',
    startDate: 'February 15',
    duration: 'Up to 2 months',
    mobileDate: 'From February 16, up to 2 months duration',
    active: !config.IS_COLLATERAL
  },

  {
    title: 'Invest in BondAppétit',
    body: 'Governance and shape the future of the protocol',
    startDate: '1 Day after P1',
    duration: '1 month',
    mobileDate: '1 Day after P1, 1 month duration',
    active: false
  },

  {
    title: 'RWA-collateral',
    body:
      'Purchase the first-ever decentralized stablecoin backed by real-world fixed-income securities',
    startDate: '1 Day after P2',
    duration: '1 month',
    mobileDate: '1 Day after P2, 1 month duration',
    active: config.IS_COLLATERAL
  }
];

export const VOTING_TEXT = [
  'Add new markets for the automatic exchange',
  'Add a new asset type (collateral) to the basket',
  'Add a new asset type to the Price Oracle',
  'Whitelist a new Depository smart contract',
  'Start the emergency shutdown procedure',
  'Add new markets for the automatic exchange of USDp',
  'Change in the reward rates for participation in liquidity pools',
  'Choose the profit distribution of the protocol',
  'Changing the list of assets available in exchange for USDp',
  'Proposal and voting on new features of the protocol',
  'Change the rate of technical costs for the maintenance of the protocol',
  'Initiate additional capitalization of the protocol',
  'Apply changes to current smart contracts'
];
