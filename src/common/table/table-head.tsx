import clsx from 'clsx';
import React from 'react';

import { useTableStyles } from './table.styles';
import { TableHeadContext } from './table-context';

export type TableHeadProps = React.HTMLProps<HTMLTableSectionElement>;

export const TableHead: React.FC<TableHeadProps> = ({
  className,
  children
}) => {
  const classes = useTableStyles();

  return (
    <TableHeadContext.Provider value="head">
      <thead className={clsx(classes.tableHead, className)}>{children}</thead>
    </TableHeadContext.Provider>
  );
};
