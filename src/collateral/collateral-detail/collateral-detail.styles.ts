import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralDetailStyles = createUseStyles(
  (theme: Theme) => ({
    list: {
      display: 'grid',

      [theme.breakpoints.md()]: {
        gridGap: 48,
        gridTemplateColumns: '1fr 1fr'
      }
    },

    section: {
      marginBottom: 100,

      [theme.breakpoints.md()]: {
        marginBottom: 200,

        '&:last-child': {
          marginBottom: 40
        }
      }
    },

    sectionTitle: {
      marginBottom: 48
    },

    card: {
      [theme.breakpoints.down(959)]: {
        minHeight: 222,

        '&:first-child': {
          borderBottom: 'none',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },

        '&:last-child': {
          borderTop: 'none',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }
      }
    }
  }),
  {
    name: 'CollateralDetail'
  }
);
