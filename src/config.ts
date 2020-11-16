export const config = {
  POLLING_INTERVAL: 12000,
  RPC_URL: 'https://127.0.0.1:8545',
  CHAIN_IDS: [1, 3, 4, 5, 42, 999],
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
  mainnetURL: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
};
