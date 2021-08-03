import { ConfigAsset, TableCellTypes, TableData } from '../collateral.types';

export const PROTOCOL_ASSETS: TableData = {
  head: [
    'Intermediary',
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
    'USP98118AA38',
    {
      percent: '-',
      issuer: 'Nexa Resources SA',
      totalValue: '-',
      amount: '-',
      coupon: '5.38%',
      maturity: '26.06.2026',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US279158AL39',
    {
      percent: '-',
      issuer: 'Ecopetrol SA',
      totalValue: '-',
      amount: '-',
      coupon: '5.38%',
      maturity: '04.05.2027',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US247361ZZ42',
    {
      percent: '-',
      issuer: 'Delta Air Lines Inc',
      totalValue: '-',
      amount: '-',
      coupon: '7,38%',
      maturity: '15.01.2026',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'US345370BY59',
    {
      percent: '-',
      issuer: 'Ford Motor Co',
      totalValue: '-',
      amount: '-',
      coupon: '6,63%',
      maturity: '01.10.2028',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'USU98401AB58',
    {
      percent: '-',
      issuer: 'Xerox Holdings Corp',
      totalValue: '-',
      amount: '-',
      coupon: '5,5%',
      maturity: '15.08.2028',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'USG0R209AA85',
    {
      percent: '-',
      issuer: 'American Airlines Inc/AAdvantage Loyalty IP Ltd',
      totalValue: '-',
      amount: '-',
      coupon: '5,5%',
      maturity: '20.04.2026',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ],
  [
    'USG0R209AB68',
    {
      percent: '-',
      issuer: 'American Airlines Inc/AAdvantage Loyalty IP Ltd',
      totalValue: '-',
      amount: '-',
      coupon: '5,75%',
      maturity: '20.04.2029',
      isinCode: '-',
      isValid: false,
      updatedAt: '-'
    }
  ]
]);
