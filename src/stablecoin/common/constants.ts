import { URLS } from 'src/router/urls';

export const FAQ = [
  {
    title: 'What is the price stability mechanism?',
    body: [
      `The price of USDap equals $1 at all times, while the token is issued only if the protocol has sufficient collateral.
      Information regarding the collateral can be checked through the blockchain at any time.`,
      `Price stability is connected to the protocol’s assets,
      the price of which should always be close to the value of USDap in circulation.`
    ]
  },

  {
    title: 'Who controls the issuance of USDap?',
    body: [
      `USDap is issued by a smart contract without any legal entity behind it.
    Issuance of USDap is decided by the community of the protocol
    only when a sufficient amount of collateral is stored.`
    ]
  },

  {
    title: 'Which assets are used as collateral of USDap?',
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
    text: `USDp is the first-ever decentralized stablecoin that is based on a basket of real-world debt obligations. USDp price equals $1 at all times and asset is issued only with sufficient collateral.`,
    link: URLS.whitepaper
  },
  {
    title: 'Decentralized and Transparent',
    text: `There is no centralized issuer behind USDp — tokens are issued automatically by a smart-contract only when required collateral is available in the real world, which can be checked by any user in real time.`,
    link: URLS.whitepaper
  },
  {
    title: 'Crypto-Liquidity backed by real cash-flows',
    text: `USDp has its own crypto liquidity pools which are partially composed of liquidity flows coming from real world assets.`,
    link: URLS.whitepaper
  }
];
