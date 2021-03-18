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
  Skeleton,
  ButtonBase
} from 'src/common';
import { URLS } from 'src/router/urls';
import { useCollateralTableStyles } from './collateral-table.styles';
import { ConfigIsinCode, TableCellTypes, TableData } from '../collateral.types';

export type CollateralTableProps = {
  data?: TableData;
  emptyFirstCol?: boolean;
  id?: string;
  onValid?: (isinCode: string) => void;
};

const isBoolean = (booleanLike: unknown): booleanLike is boolean =>
  typeof booleanLike === 'boolean';

const isPercentValue = (str: string) => str.includes('%');

const isIsinCode = (isincode: unknown): isincode is ConfigIsinCode => {
  return (
    typeof isincode === 'object' &&
    isincode !== null &&
    isincode !== undefined &&
    'contractAddress' in isincode
  );
};

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

                    const isIncode = row[cellIndex - 1];

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
                          {isBoolean(cell.title) && isIsinCode(isIncode) && (
                            <ButtonBase
                              className={cell.title ? classes.yes : classes.no}
                              onClick={() => props.onValid?.(isIncode.title)}
                            >
                              {cell.title ? '✓ Yes' : '✕ No'}
                            </ButtonBase>
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
