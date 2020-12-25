import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWalletButtonStyles = createUseStyles(
  (theme: Theme) => ({
    wrap: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    },

    button: {
      marginLeft: 19
    },

    connected: {
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 16,
      padding: 2
    },

    chip: {
      display: 'none',
      textTransform: 'capitalize',

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    },

    account: {
      padding: '2px 8px 2px 16px',
      display: 'none',
      whiteSpace: 'nowrap',

      [theme.breakpoints.md()]: {
        display: 'flex',
        alignItems: 'center'
      }
    },

    walletIcon: {
      marginRight: 12
    }
  }),
  {
    name: 'WalletButton'
  }
);
