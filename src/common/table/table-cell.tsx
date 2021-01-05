import React, { useContext } from 'react';
import clsx from 'clsx';

import { useTableStyles } from './table.styles';
import { TableHeadContext } from './table-context';

export type TableCellProps = {
  className?: string;
  rowSpan?: number;
};

export const TableCell: React.FC<TableCellProps> = (props) => {
  const classes = useTableStyles();
  const headContext = useContext(TableHeadContext);

  const Component = headContext ? 'th' : 'td';

  const { className, children, rowSpan } = props;

  return (
    <Component rowSpan={rowSpan} className={clsx(classes.tableCell, className)}>
      {children}
    </Component>
  );
};
