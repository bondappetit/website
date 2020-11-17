import networks from '@bondappetit/networks';
import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

export const useNetworkConfig = () => {
  const { chainId } = useWeb3React<Web3>();

  return useMemo(() => {
    return Object.values(networks).find(
      (network) => network.networkId === chainId
    );
  }, [chainId]);
};
