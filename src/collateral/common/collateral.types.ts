export enum TableCellTypes {
  issuer = 'issuer',
  borrower = 'borrower',
  percent = 'percent'
}

export type TableData = {
  head: string[];
  body: Array<
    Array<{
      title: string | boolean;
      rowSpan?: number;
      value?: string;
      cellType?: TableCellTypes;
    }>
  >;
};

export type TableCell = {
  cellType: TableCellTypes;
  title: string;
};

export type ConfigIsinCode = {
  title: string;
  contractAddress: string;
};

export type ConfigAsset = {
  percent: string | TableCell;
  issuer: string | TableCell;
  totalValue: string;
  amount: string;
  coupon: string;
  maturity: string;
  isinCode: string | ConfigIsinCode;
  updatedAt: string;
  isValid: boolean | string;
};
