import networks from '@bondappetit/networks';
import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

export const useNetworkConfig = () => {
  const { chainId } = useWeb3React<Web3>();

  return useMemo(() => {
    const networkConfig = Object.values(networks).find(
      (network) => network.networkId === chainId
    );

    // TODO: rewrite default network config for prod
    return networkConfig ?? networks.ropsten;
  }, [chainId]);
};
