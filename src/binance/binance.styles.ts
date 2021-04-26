import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBinanceStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      maxWidth: 640,
      margin: '0 auto'
    },

    tabs: {
      display: 'flex',
      border: `1px solid ${theme.colors.primary}`,
      boxSizing: 'border-box',
      borderRadius: 100,
      padding: 4
    },

    tabPane: {
      padding: '14px 20px',
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      width: '50%',

      [theme.breakpoints.md()]: {
        padding: '28px 32px'
      },

      '& h3': {
        opacity: 0.4
      },

      '& svg': {
        opacity: 0.8
      }
    },

    tabPaneActive: {
      backgroundColor: theme.colors.grey2,

      '& h3': {
        opacity: 1
      },

      '& svg': {
        opacity: 1
      }
    },

    tabIcon: {
      width: 32,
      height: 32,
      marginRight: 8,

      [theme.breakpoints.md()]: {
        width: 48,
        height: 48,
        marginRight: 16
      }
    },

    contractName: {
      opacity: 0.4
    },

    input: {
      height: 'auto'
    },

    form: {
      borderRadius: 16,
      minHeight: 280,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }),
  {
    name: 'Binance'
  }
);
