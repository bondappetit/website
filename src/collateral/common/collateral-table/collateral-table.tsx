import React from 'react';
import clsx from 'clsx';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  LinkIfAccount,
  PieIcon,
  Typography,
  Link,
  isEthAddress
} from 'src/common';
import { URLS } from 'src/router/urls';
import { useCollateralTableStyles } from './collateral-table.styles';

export enum TableCellTypes {
  issuer = 'issuer',
  borrower = 'borrower'
}

export type TableData = {
  head: string[];
  body: Array<
    Array<{
      title: string;
      rowSpan?: number;
      value?: string;
      cellType?: TableCellTypes;
    }>
  >;
};

export type CollateralTableProps = {
  data: TableData;
  emptyFirstCol?: boolean;
};

export const CollateralTable: React.FC<CollateralTableProps> = (props) => {
  const classes = useCollateralTableStyles();

  const numberIsNotNan = (numberLike: string) => {
    return !Number.isNaN(Number(numberLike));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {props.data.head.map((title, index) => (
            <TableCell
              key={title}
              className={clsx({
                [classes.tableCell]: index === 0 && props.emptyFirstCol
              })}
            >
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.body.map((row, index) => {
          const id = String(index);

          return (
            <TableRow key={id}>
              {row.map((cell) => (
                <TableCell
                  key={cell.title}
                  rowSpan={cell.rowSpan}
                  className={clsx({
                    [classes.tableCell]: index === 0 && props.emptyFirstCol
                  })}
                >
                  <Typography
                    variant="body1"
                    className={classes.tableCellContent}
                  >
                    {numberIsNotNan(cell.title) &&
                      !isEthAddress(cell.title) && (
                        <PieIcon className={classes.pieIcon}>
                          {Number(cell.title)}
                        </PieIcon>
                      )}
                    {cell.cellType === TableCellTypes.borrower && (
                      <Link
                        component={ReactRouterLink}
                        color="blue"
                        to={URLS.collateral.detail(cell.title)}
                      >
                        {cell.title}
                      </Link>
                    )}
                    {cell.cellType === TableCellTypes.issuer && (
                      <Link
                        component={ReactRouterLink}
                        color="blue"
                        to={URLS.collateral.issuer(cell.title)}
                      >
                        {cell.title}
                      </Link>
                    )}
                    {!cell.cellType && (
                      <LinkIfAccount>{cell.title}</LinkIfAccount>
                    )}
                    {numberIsNotNan(cell.title) &&
                      !isEthAddress(cell.title) && <>%</>}
                    {cell.value && (
                      <>
                        <br />
                        {cell.value}
                      </>
                    )}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
