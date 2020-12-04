export const URLS = {
  home: '/',
  voting: {
    list: '/voting',
    detail: (proposalId = ':proposalId') => `/voting/${proposalId}`
  },
  market: '/market',
  stacking: {
    list: '/stacking',
    detail: (tokenId = ':tokenId') => `/stacking/${tokenId}`
  },
  oracle: '/oracle',
  vesting: '/vesting'
} as const;
