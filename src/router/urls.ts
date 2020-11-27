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
  }
} as const;
