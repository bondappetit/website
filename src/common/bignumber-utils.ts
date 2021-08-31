import { BN } from './bignumber';

export const bignumberUtils = {
  fromCall: (amount: string | number, decimals: number | string) =>
    new BN(amount || 0).div(new BN(10).pow(decimals)).toString(10),

  toSend: (amount: string | number, decimals: number | string) =>
    new BN(amount || 0).multipliedBy(new BN(10).pow(decimals)).toString(10)
};
