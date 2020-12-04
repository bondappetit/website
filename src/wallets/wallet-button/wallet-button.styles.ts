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
      marginRight: 10,
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
