export const URLS = {
  main: '/',
  playground: '/playground',
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
  vesting: '/vesting',
  vestingSplitter: '/vesting-splitter',
  monitor: '/monitor',
  profitSplitter: '/profit-splitter',
  whitepaper: '/whitepaper',
  docs: {
    list: '/docs',
    detail: (contractName = ':contractName') => `/docs/${contractName}`
  },
  collateral: {
    list: '/collateral',
    issuer: (companyName = ':companyName') =>
      `/collateral/issuers/${companyName}`,
    detail: (companyName = ':companyName') =>
      `/collateral/borrowers/${companyName}`,
    borrow: '/collateral/borrow'
  },
  contract: '/contracts',
  bridge: '/bridge',
  bag: '/bag'
} as const;
