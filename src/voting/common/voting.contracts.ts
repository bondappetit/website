import type { GovernorAlpha } from 'src/generate/GovernorAlpha';
import type { Bond } from 'src/generate/Bond';
import { createUseContract } from 'src/common';

export const useGovernorContract = createUseContract<GovernorAlpha>(
	(network) => ({
		abi: network.contracts.GovernorAlpha.abi,
		address: network.contracts.GovernorAlpha.address
	})
);

export const useBondContract = createUseContract<Bond>((network) => ({
	abi: network.contracts.Bond.abi,
	address: network.contracts.Bond.address
}));
