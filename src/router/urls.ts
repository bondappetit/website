export const URLS = {
  home: '/',
  voting: {
    list: '/voting',
    detail: (proposalId = ':proposalId') => `/voting/${proposalId}`,
    create: '/voting/create'
  },
  notfound: '/404',
  market: '/market',
  staking: {
    list: '/staking',
    detail: (tokenId = ':tokenId') => `/staking/${tokenId}`
  },
  oracle: '/oracle',
  vesting: '/vesting',
  monitor: '/monitor',
  profitSplitter: '/profit-splitter',
  whitepaper: '/whitepaper',
  docs: {
    list: '/docs',
    detail: (contractName = ':contractName') => `/docs/${contractName}`
  },
  collateral: {
    list: '/collaterals',
    issuer: (companyName = ':companyName') =>
      `/collaterals/issuers/${companyName}`,
    detail: (companyName = ':companyName') =>
      `/collaterals/borrowers/${companyName}`
  }
} as const;
