import { config } from 'src/config';
import { ReactComponent as EastIcon } from 'src/assets/icons/east.svg';
import { ReactComponent as PlaceholderIcon } from 'src/assets/icons/placeholder.svg';
import alexanderInvanov from 'src/assets/images/team/alexander_ivanov.png';
import amedeoCristofaro from 'src/assets/images/team/amedeo_cristofaro.png';
import artemTolkachev from 'src/assets/images/team/artem_tolkachev.png';
import rogerOhan from 'src/assets/images/team/roger_ohan.png';
import sergeyStopnevich from 'src/assets/images/team/sergey_stopnevich.png';
import vladKomissarov from 'src/assets/images/team/vlad_komissarov.png';

export const STEPS = [
  {
    title: 'Investment Stage',
    body: 'Stake your crypto or invest in the protocol',
    mobileDate: 'From April 5, up to 3 months duration',
    active: !config.IS_COLLATERAL
  },

  {
    title: 'RWA-collateral',
    body:
      'Purchase the first-ever decentralized stablecoin backed by real-world fixed-income securities',
    mobileDate: '1 Day after P1, 2 years duration',
    active: config.IS_COLLATERAL
  },

  {
    title: 'Direct Investment',
    body:
      'The capitalization of the protocol reaches $100m. The issuance of governance tokens stops.',
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
    title: 'EAST.Finance',
    text: `BondAppetit creates an ecosystem with EAST,
    the first enterprise-grade DeFi protocol / stablecoin
    that combines real-world assets with crypto`,
    link: 'https://east.finance/',
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

export const TEAM = [
  {
    name: 'Artem Tolkachev',
    role: 'Founder, CEO',
    text: `
    Former head of the Blockchain Lab at Deloitte. For over seven years, Artem has been
    one of the key opinion leaders in the CIS region in blockchain and tokenization.
    Since 2011, he has been a lawyer by trade and an entrepreneur.
    `,
    photo: artemTolkachev
  },
  {
    name: 'Sergey Stopnevich',
    role: 'Co-Founder',
    text: `
    In 2016, Sergey founded Wise Wolves Group Ltd, a group of companies providing financial,
    brokerage, corporate, and fiduciary services to banks, mid-sized, and large businesses with
    the use of the latest IT technologies and an individual approach to each client.
    `,
    photo: sergeyStopnevich
  },
  {
    name: 'Vlad Komissarov',
    role: 'CTO',
    text: `
    Vlad has over 17 years of experience in web development.
    He launched and managed a number of major ICT products and services on the CIS market.
    `,
    photo: vladKomissarov
  },
  {
    name: 'Mr Amedeo Cristofaro',
    role: 'Advisor',
    text: `ex BNY Mellon, Head of EMEA Payment`,
    photo: amedeoCristofaro
  },
  {
    name: 'Mr Roger Ohan',
    role: 'Advisor',
    text: `Ariadne Capital, Board Director Designate`,
    photo: rogerOhan
  },
  {
    name: 'Alexander Ivanov',
    role: 'Advisor',
    text: `CEO of Waves`,
    photo: alexanderInvanov
  }
];
