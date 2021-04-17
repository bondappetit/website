import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWalletModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.md()]: {
        height: 720
      },

      [theme.breakpoints.down(750, 'height')]: {
        height: 340,
        top: 'auto',
        bottom: 0,
        transform: 'translate(-50%, 0)'
      },

      [theme.breakpoints.down(959)]: {
        transform: 'none'
      }
    },

    inner: {
      [theme.breakpoints.md()]: {
        maxHeight: 720
      }
    },

    rootConnected: {
      [theme.breakpoints.md()]: {
        height: 560
      }
    },

    innerConnected: {
      [theme.breakpoints.md()]: {
        maxHeight: 560
      }
    }
  }),
  {
    name: 'WalletModal'
  }
);
