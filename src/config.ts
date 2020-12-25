export const config = {
  POLLING_INTERVAL: 12000,
  RPC_URL: 'http://127.0.0.1:8545',
  CHAIN_IDS: [1, 3, 4, 5, 42, 999],
  ENV: process.env.NODE_ENV,
  IS_DEV: process.env.NODE_ENV === 'development',
  MAINNET_URL: process.env.REACT_APP_INFURA_API_KEY ?? '',
  COUNTDOWN_DATE: '2020-12-9',
  PORTIS_ID: process.env.REACT_APP_PORTIS_ID,
  FORTMATIC_KEY: process.env.REACT_APP_FORTMATIC_KEY
};
