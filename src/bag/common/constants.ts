export const GOVERNANCE = [
  {
    title: 'Protocol’s Management',
    text: [
      'Add a new asset type (collateral) to the basket;',
      'Add a new asset type to the Price Oracle;',
      'Whitelist a new Depository smart contract;',
      'Start the emergency shutdown procedure;',
      'Add new markets for the automatic exchange of BAG.'
    ]
  },
  {
    title: 'Protocol’s assets liquidity',
    text: [
      'Change in the reward rates for participation in liquidity pools;',
      'Choose the profit distribution of the protocol;',
      'Change the list of assets available in exchange for BAG.'
    ]
  },
  {
    title: 'Development of the protocol',
    text: [
      'Propose and vote on new features of the protocol;',
      'Change the rate of technical costs for the maintenance of the protocol;',
      'Initiate additional capitalization of the protocol;',
      'Apply changes to current smart contracts.'
    ]
  }
];

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
  }
];
