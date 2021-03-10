import { TableCellTypes, TableData } from '../collateral-table';

export const PROTOCOL_ASSETS: TableData = {
  head: [
    'Borrower',
    '%',
    'Issuer',
    'Total value',
    'Amount',
    'Coupon',
    'Maturity',
    'ISIN code',
    'Valid',
    'Last update'
  ],

  body: []
};

export type ConfigIssuer = {
  cellType: TableCellTypes;
  title: string;
};

export type ConfigAsset = {
  percent: string;
  issuer: string | ConfigIssuer;
  totalValue: string;
  amount: string;
  coupon: string;
  maturity: string;
  isinCode: string;
  updatedAt: string;
  isValid: boolean | string;
};

export const ASSETS_MAP = new Map<string, ConfigAsset>([
  [
    'USD',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: '-',
      updatedAt: '-'
    }
  ],
  [
    'XS1533921299',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US247361ZZ42',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'USY00130VS35',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'USP32466AA50',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'XS1890684688',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US682051AB34',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US91086QBA58',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US50247VAA70',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US456837AK90',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'USN30707AD06',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US09659X2E17',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US06738EAQ89',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US77586TAA43',
    {
      percent: '-',
      issuer: '-',
      totalValue: '-',
      amount: '-',
      coupon: '-',
      maturity: '-',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ]
]);
