import networks from '@bondappetit/networks';
import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { config } from 'src/config';

const defaultNetworkConfig = Object.values(networks).find(
  (network) => network.networkId === Number(config.DEFAULT_CHAIN_ID)
);

export const useNetworkConfig = () => {
  const { chainId } = useWeb3React<Web3>();

  return useMemo(() => {
    const networkConfig = Object.values(networks).find(
      (network) => network.networkId === chainId
    );

    if (!defaultNetworkConfig) {
      throw new Error(
        'process.env.REACT_APP_DEFAULT_CHAIN_ID is not specified'
      );
    }

    return networkConfig ?? defaultNetworkConfig;
  }, [chainId]);
};
