import { ConfigAsset, TableCellTypes, TableData } from '../collateral.types';

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
    'Verified',
    'Last update'
  ],

  body: []
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
      issuer: {
        cellType: TableCellTypes.issuer,
        title: 'Company 1'
      },
      totalValue: '-',
      amount: '-',
      coupon: '5.125',
      maturity: '02.02.2022',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US247361ZZ42',
    {
      percent: '-',
      issuer: {
        cellType: TableCellTypes.issuer,
        title: 'Company 3'
      },
      totalValue: '-',
      amount: '-',
      coupon: '7.375',
      maturity: '15.01.2026',
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
