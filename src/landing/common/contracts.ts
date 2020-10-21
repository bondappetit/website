import { useMemo } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import type { Investment } from 'src/generate/Investment';
import { investmentAbi } from 'src/web3/abi/investmentAbi';

export const useInvestmentContract = (): Investment | null => {
	const { library } = useWeb3React<Web3>();

	return useMemo(() => {
		if (!library) return null;

		// TODO: move to config
		return (new library.eth.Contract(
			investmentAbi,
			'0x9bb2Be2428FEFea73FEe0cB65424Efd5c4e9BC00'
		) as unknown) as Investment;
	}, [library]);
};
