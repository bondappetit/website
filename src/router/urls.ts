export const URLS = {
  home: '/',
  voting: {
    list: '/voting',
    detail: (proposalId = ':proposalId') => `/voting/${proposalId}`,
    create: '/voting/create'
  },
  market: '/market',
  stacking: {
    list: '/stacking',
    detail: (tokenId = ':tokenId') => `/stacking/${tokenId}`
  },
  oracle: '/oracle'
} as const;
