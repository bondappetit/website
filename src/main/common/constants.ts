import { config } from 'src/config';
import { ReactComponent as EastIcon } from 'src/assets/icons/east.svg';
import { ReactComponent as PlaceholderIcon } from 'src/assets/icons/placeholder.svg';
import artemTolkachev from 'src/assets/images/team/artem_tolkachev.png';
import vladKomissarov from 'src/assets/images/team/vlad_komissarov.png';
import { dateUtils } from 'src/common';

export const STEPS = [
  {
    title: 'Investment Stage',
    body: 'Stake your crypto or invest in the protocol',
    mobileDate: 'From April 5, up to 3 months duration',
    status: 'done',
    progress: 100
  },

  {
    title: 'RWA-collateral',
    body: 'Purchase the first-ever decentralized stablecoin backed by real-world fixed-income securities',
    mobileDate: '1 Day after P1, 2 years duration',
    status: config.IS_COLLATERAL ? 'active' : 'done',
    progress:
      ((dateUtils.getTotalMonth2Phase(config.PHASE2_COUNTDOWN) -
        dateUtils.getRemainingMonth2Phase()) /
        dateUtils.getTotalMonth2Phase(config.PHASE2_COUNTDOWN)) *
      100
  },

  {
    title: 'Direct Investment',
    body: 'The capitalization of the protocol reaches $100m. The issuance of governance tokens stops.',
    mobileDate: '1 Day after P2, unlimited',
    status: 'none',
    progress: 100
  }
] as const;

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
    title: 'EAST.Finance',
    text: `BondAppetit creates an ecosystem with EAST, the first enterprise-grade DeFi protocol / stablecoin that combines real-world assets with crypto`,
    link: 'https://east.finance/',
    onClick: false,
    linkLabel: 'east.finance',
    icon: EastIcon
  },
  {
    title: 'Become a partner',
    text: `BondAppetit is always looking for new partners to collaborate with. Drop us a line if you have a proposal or an idea.`,
    link: '',
    onClick: true,
    linkLabel: 'Get in touch',
    icon: PlaceholderIcon
  }
];

export const TEAM = [
  {
    name: 'Artem Tolkachev',
    role: 'Founder, CEO',
    twitter: 'https://twitter.com/artemtolkachev',
    linkedin: 'https://linkedin.com/in/artemtolkachev',
    text: `
    Former head of the Blockchain Lab at Deloitte. For over seven years, Artem has been
    one of the key opinion leaders in the CIS region in blockchain and tokenization.
    Since 2011, he has been a lawyer by trade and an entrepreneur.
    `,
    photo: artemTolkachev
  },
  {
    name: 'Vlad Komissarov',
    role: 'CTO',
    twitter: 'https://twitter.com/cryptoappetit',
    linkedin: 'https://linkedin.com/in/vkomissarov',
    text: `
    Vlad has over 17 years of experience in web development.
    He launched and managed a number of major ICT products and services on the CIS market.
    `,
    photo: vladKomissarov
  }
];
