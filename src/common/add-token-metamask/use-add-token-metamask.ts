import { useCallback } from 'react';

import { useNetworkConfig } from 'src/common/use-network-config';

export const useAddTokenMetamask = (type: 'Governance' | 'Stable') => {
  const networkConfig = useNetworkConfig();

  return useCallback(() => {
    const asset = networkConfig.assets[type];

    if (!window.ethereum?.isMetaMask || !asset) return;

    const tokenAddress = asset.address;
    const tokenSymbol = asset.symbol;
    const tokenDecimals = asset.decimals;

    return window.ethereum?.request?.({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals
        }
      }
    });
  }, [networkConfig, type]);
};
