import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useTableStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'block',
      width: '100%',
      overflowX: 'auto',
      maxWidth: 'calc(100vw - 30px)',

      [theme.breakpoints.lg()]: {
        display: 'unset',
        width: 'unset',
        overflowX: 'unset'
      }
    },

    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left'
    },

    tableHead: {
      display: 'table-header-group'
    },

    tableBody: {
      display: 'table-row-group'
    },

    tableCell: {
      padding: 16,
      border: 'none',
      verticalAlign: 'top'
    },

    tableRow: {
      verticalAlign: 'middle',
      borderBottom: `dotted 1px ${theme.colors.primary}`,

      '&:first-child': {
        borderTop: `dotted 1px ${theme.colors.primary}`
      }
    }
  }),
  {
    name: 'Table'
  }
);
