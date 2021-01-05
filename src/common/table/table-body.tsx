import clsx from 'clsx';
import React from 'react';

import { useTableStyles } from './table.styles';

export type TableBodyProps = React.HTMLProps<HTMLTableSectionElement>;

export const TableBody: React.FC<TableBodyProps> = ({
  className,
  children
}) => {
  const classes = useTableStyles();

  return (
    <tbody className={clsx(classes.tableBody, className)}>{children}</tbody>
  );
};
