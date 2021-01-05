import clsx from 'clsx';
import React from 'react';

import { useTableStyles } from './table.styles';

export type TableProps = React.HTMLProps<HTMLTableElement>;

export const Table: React.FC<TableProps> = ({ className, children }) => {
  const classes = useTableStyles();

  return (
    <div className={classes.root}>
      <table className={clsx(classes.table, className)}>{children}</table>
    </div>
  );
};
