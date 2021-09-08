import { URLS } from 'src/router/urls';

export const FAQ = [
  {
    title: 'How is the price of USDap kept stable?',
    body: [
      `The price of USDap equals $1 at all times and the asset is issued only with sufficient collateral. USDap is 100% backed by yield-generating bonds. The bonds are stored by a licensed custodian in a stable jurisdiction. Anyone can check their availability any time online at https://bondappetit.com/collateral. The information is transmitted from the custodian and is digitally signed making data spoofing impossible.`
    ]
  },

  {
    title: 'Who controls the issuance of USDap?',
    body: [
      `USDap is issued by a smart contract without any legal entity behind it. The token is issued only when sufficient collateral is available. BondAppetit is a decentralized protocol controlled only by its community.`
    ]
  },

  {
    title: 'What assets back the USDap?',
    body: [
      `USDap is backed by real-world fixed-income securities (bonds) provided as collateral for the loan by borrowers.`
    ]
  },

  {
    title: 'What is the legal classification of USDap?',
    body: [
      `USDap represents a means of transferring value and it is defined as such exclusively by market participants.
      The token itself does not imply any obligations of the protocol, any of its participants, or third-parties.`
    ]
  },

  {
    title:
      'If a bond defaults, are USDap bought back? If so, who pays for them?',
    body: [
      `In the event of a significant change in asset prices or a default, the protocol may initiate additional capitalization: `
    ],
    link: '/whitepaper#6'
  }
];

export const STABLE = [
  {
    title: 'Real-world debt obligations',
    text: `USDap is the first decentralized stablecoin that is based on a basket of real-world debt obligations. The price of USDap equals $1 at all times and the asset is issued only with sufficient collateral.`,
    link: URLS.whitepaper
  },
  {
    title: 'Decentralized and Transparent',
    text: `There is no centralized issuer behind USDap — tokens are issued automatically by a smart-contract only when required collateral is available in the real world. Anyone can check collateral any time online at bondappetit.com/collateral. No single protocol with fiat collateral — neither USDC, nor USDT — has this level of transparency.`,
    link: URLS.whitepaper
  },
  {
    title: 'Crypto-Liquidity backed by real cash-flows',
    text: `USDap has its own crypto liquidity pools which are partially composed of liquidity flows coming from real-world assets.`,
    link: URLS.whitepaper
  }
];
