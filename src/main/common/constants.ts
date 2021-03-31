import { config } from 'src/config';
import { ReactComponent as EastIcon } from 'src/assets/icons/east.svg';
import { ReactComponent as PlaceholderIcon } from 'src/assets/icons/placeholder.svg';

export const STEPS = [
  {
    title: 'Investment Stage',
    body: 'Stake your crypto or invest in the protocol with a 50% discount',
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
      'The capitalization of the protocol reaches $100m. The issuance of governance tokens stops.',
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

export const WAVES_CARDS = [
  {
    title: 'Waves Enterprise',
    text: `BondAppetit creates ecosystem with EAST,
    the first enterprise-grade DeFi protocol / stablecoin that
    combines Real-World Assets with crypto`,
    link: 'http://east.finance/',
    onClick: false,
    linkLabel: 'east.finance',
    icon: EastIcon
  },
  {
    title: 'Become a partner',
    text: `BondAppetit always looking for great projects to collaborate with.
    If you have one, feel free to contact.`,
    link: '',
    onClick: true,
    linkLabel: 'Fill in the form',
    icon: PlaceholderIcon
  }
];
