import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBridgeBinanceBalanceStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0 10px'
    },

    title: {
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        whiteSpace: 'pre'
      }
    },

    actions: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',

      [theme.breakpoints.md()]: {
        flexDirection: 'row'
      }
    },

    button: {
      fontSize: 20,
      lineHeight: '28px',
      padding: '6px 24px',
      borderRadius: 10,

      '&:not(:last-child)': {
        marginBottom: 16
      },

      [theme.breakpoints.md()]: {
        '&:not(:last-child)': {
          marginRight: 16,
          marginBottom: 0
        }
      }
    },

    buyButton: {
      color: theme.colors.secondary
    }
  }),
  {
    name: 'BridgeBinanceBalance'
  }
);
