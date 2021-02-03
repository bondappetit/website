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

    assetsTitle: {
      maxWidth: 800,
      margin: '0 auto 104px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 128px'
      }
    },

    borrowText: {
      marginBottom: 16
    }
  }),
  {
    name: 'CollateralBorrowInfo'
  }
);
