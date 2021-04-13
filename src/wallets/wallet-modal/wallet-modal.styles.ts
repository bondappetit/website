import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWalletModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.md()]: {
        height: 558
      }
    }
  }),
  {
    name: 'WalletModal'
  }
);
