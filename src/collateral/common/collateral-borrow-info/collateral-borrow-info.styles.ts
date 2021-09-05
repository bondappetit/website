import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralBorrowInfoStyles = createUseStyles(
  (theme: Theme) => ({
    section: {
      marginBottom: 100,

      [theme.breakpoints.md()]: {
        marginBottom: 200,

        '&:last-child': {
          marginBottom: 40
        }
      }
    },

    borrowTitle: {
      marginBottom: 16
    },

    borrowText: {
      marginBottom: 24
    }
  }),
  {
    name: 'CollateralBorrowInfo'
  }
);
