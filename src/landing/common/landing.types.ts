import BN from 'bn.js';

export type Token = {
	tokenName: string;
	tokenAddress: string;
	tokenPrice: string | BN;
};
