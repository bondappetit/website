export const URLS = {
  main: '/',
  voting: {
    info: '/governance',
    list: '/governance/proposals',
    detail: (proposalId = ':proposalId') =>
      `/governance/proposals/${proposalId}` as const,
    create: '/governance/proposals/create'
  },
  stablecoin: '/stablecoin',
  notfound: '/404',
  staking: {
    list: '/staking',
    detail: (tokenId = ':tokenId') => `/staking/${tokenId}` as const,
    coupons: (couponId = ':couponId') => `/staking/coupons/${couponId}` as const
  },
  vesting: '/vesting',
  vestingSplitter: '/vesting-splitter',
  monitor: '/monitor',
  profitSplitter: '/profit-splitter',
  whitepaper: '/whitepaper',
  docs: {
    list: '/docs',
    detail: (contractName = ':contractName') => `/docs/${contractName}` as const
  },
  collateral: {
    list: '/collateral',
    issuer: (companyName = ':companyName') =>
      `/collateral/issuers/${companyName}` as const,
    detail: (companyName = ':companyName') =>
      `/collateral/borrowers/${companyName}` as const,
    borrow: '/collateral/borrow'
  },
  contract: '/contracts',
  bridge: '/bridge',
  bag: '/bag',
  yieldEscrow: '/yield-escrow'
} as const;
