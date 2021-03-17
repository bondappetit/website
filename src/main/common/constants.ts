import { config } from 'src/config';

export const STEPS = [
  {
    title: 'Invest in BondAppétit',
    body:
      'Stake in early stage or invest in protocol to purchase RWA assets in collateral',
    startDate: 'March 15',
    duration: 'Up to 2 months',
    mobileDate: 'From March 15, up to 3 months duration',
    active: !config.IS_COLLATERAL
  },

  {
    title: 'RWA-collateral',
    body:
      'Purchase the first-ever decentralized stablecoin backed by real-world fixed-income securities',
    startDate: '1 Day after P1',
    duration: '2 years',
    mobileDate: '1 Day after P1, 2 years duration',
    active: config.IS_COLLATERAL
  },

  {
    title: 'Direct Investment',
    body:
      'Protocol’s capitalization - $100M. No more BAG tokens will be issued to the open market',
    startDate: '1 Day after P2',
    duration: 'unlimited',
    mobileDate: '1 Day after P2, unlimited',
    active: false
  }
];

export const VOTING_TEXT = [
  'Add new markets for automatic exchange of USDap',
  'Add a new asset type (collateral) to the basket',
  'Add a new asset type to the Price Oracle',
  'Whitelist a new Depository smart contract',
  'Start emergency shutdown procedure',
  'Add new markets for the automatic exchange of USDap',
  'Change in the reward rates for participation in liquidity pools',
  'Choose the profit distribution of the protocol',
  'Change of the list of assets available for exchange for USDap',
  'Proposal and voting on new features of the protocol',
  'Change the rate of technical costs for the maintenance of the protocol',
  'Initiate additional capitalization of the protocol',
  'Apply changes to current smart contracts'
];
