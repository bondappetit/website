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
