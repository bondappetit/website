import networks from '@artur-mamedbekov/networkds-test';
import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { config } from 'src/config';

export const useNetworkConfig = () => {
	const { chainId } = useWeb3React<Web3>();

	return useMemo(() => {
		if (config.isDev) {
			return networks.development;
		}

		return Object.values(networks).find(
			(network) => network.networkId === chainId
		);
	}, [chainId]);
};
