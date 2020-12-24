import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStatusStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      margin: 0,
      minWidth: 0,
      fontWeight: 400,
      borderRadius: 8,
      padding: '0 8px',
      border: '1px solid currentColor',
      display: 'inline-block'
    },

    grey: {
      color: theme.colors.grey
    },

    blue: {
      color: theme.colors.blue
    },

    red: {
      color: theme.colors.red
    },

    yellow: {
      color: theme.colors.orange
    },

    green: {
      color: theme.colors.green
    },

    pink: {
      color: theme.colors.pink
    }
  }),
  {
    name: 'Status'
  }
);
