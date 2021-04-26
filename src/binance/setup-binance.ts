import { config } from 'src/config';

export const setupNetwork = async () => {
  const provider = window.ethereum;

  if (provider) {
    const chainId =
      config.CHAIN_BINANCE_IDS[config.CHAIN_BINANCE_IDS.length - 1];

    try {
      await provider.request?.({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18
            },
            rpcUrls: [
              'https://bsc-dataseed.binance.org/',
              'https://bsc-dataseed1.defibit.io/',
              'https://bsc-dataseed1.ninicoin.io/'
            ],
            blockExplorerUrls: ['https://bscscan.com/']
          }
        ]
      });
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};
