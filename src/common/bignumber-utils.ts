import { BN } from './bignumber';

export const bignumberUtils = {
  fromCall: (amount: string | number, decimals: number | string) =>
    new BN(amount || 0).div(new BN(10).pow(decimals)).toString(10),

  toSend: (amount: string | number, decimals: number | string) =>
    new BN(amount || 0).multipliedBy(new BN(10).pow(decimals)).toString(10),

  toPercent: (amount?: string | number) =>
    new BN(amount || 0).multipliedBy(100).toString(10),

  mul: (num1?: string | number, num2?: string | number) =>
    new BN(num1 || 0).multipliedBy(num2 || 0).toString(10),

  div: (num1?: string | number, num2?: string | number) =>
    new BN(num1 || 0).div(num2 || 1).toString(10),

  eq: (num1?: string | number | null, num2?: string | number | null) =>
    new BN(num1 || 0).isEqualTo(num2 || 0),

  lt: (num1?: string | number | null, num2?: string | number | null) =>
    new BN(num1 || 0).isLessThan(num2 || 0)
};
