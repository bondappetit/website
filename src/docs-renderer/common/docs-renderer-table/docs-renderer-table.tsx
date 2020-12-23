import React from 'react';

import { useDocsRendererTableStyles } from './docs-renderer-table.styles';

export type DocsRendererTableProps = React.HTMLProps<HTMLTableElement>;

export const DocsRendererTable: React.FC<DocsRendererTableProps> = ({
  children
}) => {
  const classes = useDocsRendererTableStyles();

  return (
    <div className={classes.root}>
      <table className={classes.table}>{children}</table>
    </div>
  );
};
