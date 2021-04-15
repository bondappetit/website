import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWalletModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.md()]: {
        height: 640
      }
    },

    inner: {
      [theme.breakpoints.md()]: {
        maxHeight: 640
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
