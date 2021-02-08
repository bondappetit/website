import React from 'react';
import clsx from 'clsx';

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from 'src/common';
import { STABLECOIN_TABLE_DATA } from './stablecoin-table-data';
import { useStablecoinTableStyles } from './stablecoin-table.styles';

export type StablecoinTableProps = {
  className?: string;
};

export const StablecoinTable: React.FC<StablecoinTableProps> = (props) => {
  const classes = useStablecoinTableStyles();

  return (
    <div className={props.className}>
      <Typography variant="h2" align="center" className={classes.title}>
        Compare Stablecoins
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
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
                className={clsx({
                  [classes.rowGrey]: rowInd === 0
                })}
              >
                {row.map((cell, cellInd) => {
                  const cellId = String(cellInd);

                  const yes = cell === 'Yes';
                  const no = cell === 'No';

                  return (
                    <TableCell key={cellId}>
                      <Typography
                        variant="body1"
                        align={yes || no ? 'center' : undefined}
                        className={clsx({
                          [classes.no]: no,
                          [classes.yes]: yes
                        })}
                      >
                        {no && '✕'} {yes && '✓'} {cell}
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
