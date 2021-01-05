import React from 'react';
import clsx from 'clsx';

import { useTableStyles } from './table.styles';

export type TableRowProps = React.HTMLProps<HTMLTableRowElement>;

export const TableRow: React.FC<TableRowProps> = ({ className, children }) => {
  const classes = useTableStyles();

  return <tr className={clsx(classes.tableRow, className)}>{children}</tr>;
};
