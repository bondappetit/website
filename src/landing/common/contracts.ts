import IERC20 from '@artur-mamedbekov/networkds-test/networks/abi/IERC20.json';
import { AbiItem } from 'web3-utils';

import type { Investment } from 'src/generate/Investment';
import type { Ierc20 } from 'src/generate/IERC20';
import { makeContract } from 'src/common';

export const useInvestmentContract = makeContract<Investment>((network) => ({
	abi: network.contracts.Investment.abi,
	address: network.contracts.Investment.address
}));

export const useUSDTContract = makeContract<Ierc20>((network) => ({
	abi: IERC20.abi as AbiItem[],
	address: network.assets.USDT.address
}));

export const useDAIContract = makeContract<Ierc20>((network) => ({
	abi: IERC20.abi as AbiItem[],
	address: network.assets.DAI.address
}));

export const useUSDCContract = makeContract<Ierc20>((network) => ({
	abi: IERC20.abi as AbiItem[],
	address: network.assets.USDC.address
}));

export const useBondContract = makeContract<Ierc20>((network) => ({
	abi: IERC20.abi as AbiItem[],
	address: network.assets.Bond.address
}));