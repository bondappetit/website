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
      marginLeft: 10,

      [theme.breakpoints.md()]: {
        '&:hover $label': {
          opacity: 0.4
        }
      }
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

    label: {
      opacity: 0,
      marginRight: 10,
      transition: 'opacity .3s ease',
      display: 'none',
      whiteSpace: 'nowrap',

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    },

    account: {
      padding: '2px 8px 2px 16px',
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    }
  }),
  {
    name: 'WalletButton'
  }
);
