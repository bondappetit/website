import networks from '@bondappetit/networks';

const defaultNetworkConfig = Object.values(networks).find(
  (network) =>
    network.networkId === Number(process.env.REACT_APP_DEFAULT_CHAIN_ID)
);

if (!defaultNetworkConfig) {
  throw new Error('process.env.REACT_APP_DEFAULT_CHAIN_ID is not specified');
}

export const config = {
  CHAIN_IDS: [1, 3, 4, 5, 42, 999],
  CHAIN_BINANCE_IDS: [56, 97],
  ENV: process.env.NODE_ENV,
  IS_DEV: process.env.NODE_ENV === 'development',
  DEFAULT_CHAIN_ID: process.env.REACT_APP_DEFAULT_CHAIN_ID,
  DEFAULT_NETWORK_CONFIG: defaultNetworkConfig,
  PORTIS_ID: process.env.REACT_APP_PORTIS_ID,
  FORTMATIC_KEY: process.env.REACT_APP_FORTMATIC_KEY,
  IS_INVEST: process.env.REACT_APP_IS_INVEST === 'true',
  IS_COLLATERAL: process.env.REACT_APP_IS_COLLATERAL === 'true',
  UNISENDER_API: `https://api.unisender.com/ru/api/subscribe?format=json&api_key=${process.env.REACT_APP_UNISENDER_API}`,
  API_URL: process.env.REACT_APP_API_URL,
  POLLING_INTERVAL: 15000,
  SENTRY: process.env.REACT_APP_SENTRY,
  IS_LOCAL: process.env.REACT_APP_IS_LOCAL === 'true',
  TREZOR_URL: process.env.REACT_APP_TREZOR_URL ?? '',
  TREZOR_EMAIL: process.env.REACT_APP_TREZOR_EMAIL ?? '',
  YM_ID: 75624769,
  PANCAKESWAP_URL: process.env.REACT_APP_PANCAKESWAP_URL,
  WAVES_URL: process.env.REACT_APP_WAVES_URL,
  SWOP_URL: process.env.REACT_APP_SWOP_URL,
  PHASE1_COUNTDOWN: '2021-07-15',
  PHASE2_COUNTDOWN: '2021-07-1 13:00:00',
  COMMIT_HASH: process.env.COMMIT_HASH,
  BRANCH: process.env.BRANCH,
  BUILD_DATE: process.env.BUILD_DATE,
  SWOP_FI_ENABLE: process.env.REACT_APP_SWOP_FI_ENABLE === 'true',
  BUY_BACK_ENABLE: process.env.REACT_APP_BUY_BACK_ENABLE === 'true',
  IMPROPERLY_PROPOSALS:
    process.env.REACT_APP_IMPROPERLY_PROPOSALS?.split(',') ?? []
};
