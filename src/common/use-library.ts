import { useEffect, useMemo, useRef } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import networks from '@bondappetit/networks';

import { config } from 'src/config';
import { useNetworkConfig } from './use-network-config';

export const useLibrary = () => {
  const { library, chainId } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();
  const providerRef = useRef(
    chainId && config.CHAIN_BINANCE_IDS.includes(chainId)
      ? new Web3(networks.main.networkUrl)
      : new Web3(networkConfig.networkUrl)
  );

  useEffect(() => {
    providerRef.current = new Web3(networkConfig.networkUrl);
  }, [networkConfig.networkUrl]);

  return useMemo(() => {
    if (chainId && config.CHAIN_BINANCE_IDS.includes(chainId)) {
      return new Web3(networks.main.networkUrl);
    }

    return library ?? providerRef.current;
  }, [library, chainId]);
};
