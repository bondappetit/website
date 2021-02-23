import networks from '@bondappetit/networks';

const defaultNetworkConfig = Object.values(networks).find(
  (network) =>
    network.networkId === Number(process.env.REACT_APP_DEFAULT_CHAIN_ID)
);

if (!defaultNetworkConfig) {
  throw new Error('process.env.REACT_APP_DEFAULT_CHAIN_ID is not specified');
}

export const config = {
  POLLING_INTERVAL: 12000,
  RPC_URL: 'http://127.0.0.1:8545',
  CHAIN_IDS: [1, 3, 4, 5, 42, 999],
  ENV: process.env.NODE_ENV,
  IS_DEV: process.env.NODE_ENV === 'development',
  DEFAULT_CHAIN_ID: process.env.REACT_APP_DEFAULT_CHAIN_ID,
  DEFAULT_NETWORK_CONFIG: defaultNetworkConfig,
  COUNTDOWN_DATE: '2021-02-23',
  PORTIS_ID: process.env.REACT_APP_PORTIS_ID,
  FORTMATIC_KEY: process.env.REACT_APP_FORTMATIC_KEY,
  IS_INVEST: process.env.REACT_APP_IS_INVEST === 'true',
  IS_COLLATERAL: process.env.REACT_APP_IS_COLLATERAL === 'true',
  UNISENDER_API: `https://api.unisender.com/ru/api/subscribe?format=json&api_key=${process.env.REACT_APP_UNISENDER_API}`
};
