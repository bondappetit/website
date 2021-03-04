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
  numberArray,
  Skeleton
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
      title: string | boolean;
      rowSpan?: number;
      value?: string;
      cellType?: TableCellTypes;
    }>
  >;
};

export type CollateralTableProps = {
  data?: TableData;
  emptyFirstCol?: boolean;
  id?: string;
};

const isBoolean = (booleanLike: unknown): booleanLike is boolean =>
  typeof booleanLike === 'boolean';

const isPercentValue = (str: string) => str.includes('%');

export const CollateralTable: React.FC<CollateralTableProps> = (props) => {
  const classes = useCollateralTableStyles();

  return (
    <Table id={props.id}>
      <TableHead>
        <TableRow>
          {!props.data
            ? numberArray(10).map((num) => (
                <TableCell key={num}>
                  <Skeleton />
                </TableCell>
              ))
            : props.data.head.map((title, index) => (
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
        {!props.data
          ? numberArray(10).map((num) => (
              <TableRow key={num}>
                {numberArray(10).map((subnum) => (
                  <TableCell key={subnum}>
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : props.data?.body.map((row, rowIndex) => {
              const rowId = String(rowIndex);

              return (
                <TableRow key={rowId}>
                  {row.map((cell, cellIndex) => {
                    const cellId = String(cellIndex);

                    return (
                      <TableCell
                        key={cellId}
                        rowSpan={cell.rowSpan}
                        className={clsx({
                          [classes.tableCell]:
                            rowIndex === 0 && props.emptyFirstCol
                        })}
                      >
                        <Typography
                          variant="body1"
                          className={classes.tableCellContent}
                        >
                          {!isBoolean(cell.title) &&
                            isPercentValue(cell.title) && (
                              <PieIcon className={classes.pieIcon}>
                                {Number(cell.title.replace('%', ''))}
                              </PieIcon>
                            )}
                          {cell.cellType === TableCellTypes.borrower &&
                            !isBoolean(cell.title) && (
                              <Link
                                component={ReactRouterLink}
                                color="blue"
                                to={URLS.collateral.detail(cell.title)}
                              >
                                {cell.title}
                              </Link>
                            )}
                          {cell.cellType === TableCellTypes.issuer &&
                            !isBoolean(cell.title) && (
                              <Link
                                component={ReactRouterLink}
                                color="blue"
                                to={URLS.collateral.issuer(cell.title)}
                              >
                                {cell.title}
                              </Link>
                            )}
                          {!cell.cellType && !isBoolean(cell.title) && (
                            <LinkIfAccount>{cell.title}</LinkIfAccount>
                          )}
                          {cell.value && (
                            <>
                              <br />
                              {cell.value}
                            </>
                          )}
                          {isBoolean(cell.title) && (
                            <Link
                              component={ReactRouterLink}
                              to={URLS.collateral.check(
                                String(row[cellIndex - 1].title)
                              )}
                              className={cell.title ? classes.yes : classes.no}
                            >
                              {cell.title ? '✓ Yes' : '✕ No'}
                            </Link>
                          )}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
};
