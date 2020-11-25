export const URLS = {
  home: '/',
  voting: {
    list: '/voting',
    detail: (proposalId = ':proposalId') => `/voting/${proposalId}`
  },
  market: '/market',
  staking: {
    list: '/staking',
    detail: (tokenId = ':tokenId') => `/staking/${tokenId}`
  }
} as const;
