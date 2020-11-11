export const URLS = {
  home: '/',
  voting: {
    list: '/voting',
    detail: (proposalId = ':proposalId') => `/voting/${proposalId}`
  }
} as const;
