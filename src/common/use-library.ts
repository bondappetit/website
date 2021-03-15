import { useEffect, useMemo, useRef } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useNetworkConfig } from './use-network-config';

export const useLibrary = () => {
  const { library } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();
  const providerRef = useRef(new Web3(networkConfig.networkUrl));

  useEffect(() => {
    providerRef.current = new Web3(networkConfig.networkUrl);
  }, [networkConfig.networkUrl]);

  return useMemo(() => library ?? providerRef.current, [library]);
};
