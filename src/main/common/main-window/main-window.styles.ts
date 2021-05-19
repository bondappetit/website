import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainWindowStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      border: `1px solid ${theme.colors.primary}`,
      height: 456,
      padding: 12,
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        minHeight: 600,
        padding: 24,
        borderRadius: 24
      }
    },

    actions: {
      display: 'flex'
    },

    actionsItem: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: `1px solid ${theme.colors.primary}`,
      '&:not(:last-child)': {
        marginRight: 8
      },

      [theme.breakpoints.md()]: {
        width: 24,
        height: 24,

        '&:not(:last-child)': {
          marginRight: 16
        }
      }
    }
  }),
  {
    name: 'MainWindow'
  }
);
