import React from 'react';
import clsx from 'clsx';

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  COIN_ICONS
} from 'src/common';
import { ReactComponent as YesIcon } from 'src/assets/icons/yes.svg';
import { ReactComponent as NoIcon } from 'src/assets/icons/no.svg';
import { STABLECOIN_TABLE_DATA } from './stablecoin-table-data';
import { useStablecoinTableStyles } from './stablecoin-table.styles';

export type StablecoinTableProps = {
  className?: string;
};

export const StablecoinTable: React.FC<StablecoinTableProps> = (props) => {
  const classes = useStablecoinTableStyles();

  return (
    <div className={props.className} id="compare">
      <Typography variant="h3" weight="bold" className={classes.title}>
        Compare
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={clsx(classes.tableRow, classes.borderTopNone)}>
            {STABLECOIN_TABLE_DATA.head.map((title, index) => (
              <TableCell key={title}>
                <Typography
                  variant="body1"
                  weight="bold"
                  align={index > 1 ? 'center' : undefined}
                  className={classes.headTitle}
                >
                  {title}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {STABLECOIN_TABLE_DATA.body.map((row, rowInd) => {
            const rowId = String(rowInd);

            return (
              <TableRow
                key={rowId}
                className={clsx(classes.tableRow, classes.borderBottomNone)}
              >
                {row.map((cell, cellInd) => {
                  const cellId = String(cellInd);

                  const yes = cell === 'Yes';
                  const no = cell === 'No';

                  const Icon = Array.isArray(cell)
                    ? COIN_ICONS.get(cell[1])
                    : undefined;

                  const cellItem = Array.isArray(cell) ? (
                    <>
                      {Icon && <Icon className={classes.coin} />} {cell[0]}{' '}
                      <span className={classes.coinTitle}>{cell[1]}</span>
                    </>
                  ) : (
                    cell
                  );

                  const yesOrNo = yes || no;

                  return (
                    <TableCell key={cellId}>
                      <Typography
                        variant="h5"
                        component="p"
                        align={yesOrNo ? 'center' : undefined}
                        className={clsx(classes.tableCell)}
                      >
                        {no && (
                          <NoIcon className={clsx(yesOrNo && classes.icon)} />
                        )}{' '}
                        {yes && (
                          <YesIcon className={clsx(yesOrNo && classes.icon)} />
                        )}{' '}
                        {!yesOrNo && cellItem}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
