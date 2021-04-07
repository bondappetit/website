import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWalletProfileStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative'
    },

    dropdown: {
      position: 'absolute',
      right: 0,
      top: '100%',
      paddingTop: 16,
      zIndex: 10
    },

    plate: {
      width: 512,
      height: 248,
      padding: 24,
      flexDirection: 'column'
    },

    header: {
      justifyContent: 'space-between',
      borderBottom: `1px solid ${rgba(theme.colors.primary, 0.08)}`,
      paddingBottom: 16,
      marginBottom: 16
    },

    buy: {
      color: theme.colors.darkBlue
    },

    row: {
      display: 'flex',

      [theme.breakpoints.down(600)]: {
        '& p': {
          fontSize: 14,
          lineHeight: '20px'
        }
      }
    },

    col35: {
      width: '35%'
    },

    col30: {
      width: '30%'
    },

    mb8: {
      marginBottom: 8
    },

    footer: {
      borderTop: `1px solid ${rgba(theme.colors.primary, 0.08)}`,
      paddingTop: 16,
      marginTop: 16,
      marginBottom: 16
    },

    button: {
      marginTop: 'auto',
      marginBottom: 16
    },

    skeleton: {
      width: '100%',
      minWidth: 100
    }
  }),
  {
    name: 'WalletProfile'
  }
);
