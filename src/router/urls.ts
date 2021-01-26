export const URLS = {
  main: '/',
  voting: {
    info: '/governance',
    list: '/governance/proposals',
    detail: (proposalId = ':proposalId') =>
      `/governance/proposals/${proposalId}`,
    create: '/governance/proposals/create'
  },
  stablecoin: '/stablecoin',
  notfound: '/404',
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
      `/collaterals/borrowers/${companyName}`,
    borrow: '/collaterals/borrow'
  }
} as const;
