import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import type { AbiItem } from 'web3-utils';
import type { ContractOptions } from 'web3-eth-contract';
import networks from '@artur-mamedbekov/networkds-test';

import { useNetworkConfig } from './use-network-config';

type Callback = (
	network: typeof networks[keyof typeof networks]
) => {
	abi: AbiItem[] | AbiItem;
	address?: string;
	options?: ContractOptions;
};

export const createUseContract = <T>(cb: Callback) => () => {
	const { library } = useWeb3React<Web3>();
	const networkConfig = useNetworkConfig();
	const web3 = library ?? new Web3(Web3.givenProvider);

	return useMemo(() => {
		if (!web3 || !networkConfig) return null;

		const contractParams = cb(networkConfig);

		return (new web3.eth.Contract(
			contractParams.abi,
			contractParams.address,
			contractParams.options
		) as unknown) as T;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [web3]);
};
