import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import type { AbiItem } from 'web3-utils';
import type { ContractOptions } from 'web3-eth-contract';
import networks from '@artur-mamedbekov/networkds-test';

type Callback = (
	network: typeof networks[keyof typeof networks]
) => {
	abi: AbiItem[] | AbiItem;
	address?: string;
	options?: ContractOptions;
};

export const makeContract = <T>(cb: Callback) => () => {
	const { library } = useWeb3React<Web3>();

	return useMemo(() => {
		if (!library) return null;

		// TODO: add dynamic network
		const contractParams = cb(networks.development);

		return (new library.eth.Contract(
			contractParams.abi,
			contractParams.address,
			contractParams.options
		) as unknown) as T;
	}, [library]);
};
