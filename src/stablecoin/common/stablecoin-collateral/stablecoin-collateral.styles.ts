import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinCollateralStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      width: '100%'
    },

    list: {
      display: 'grid',

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 104px 1fr',
        alignItems: 'center',
        gridGap: 0
      }
    },

    title: {
      fontSize: 14,
      lineHeight: '20px',
      marginBottom: 8,

      [theme.breakpoints.md()]: {
        fontSize: 20,
        lineHeight: '28px',
        marginBottom: 0
      }
    },

    body: {
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',

      [theme.breakpoints.md()]: {
        minHeight: 400
      }
    },

    bodyText: {
      fontSize: 24,
      lineHeight: '32px',
      marginBottom: 8,

      [theme.breakpoints.md()]: {
        fontSize: 40,
        lineHeight: '48px',
        marginBottom: 0
      }
    },

    subtitle: {
      fontSize: 14,
      lineHeight: '20px',

      [theme.breakpoints.md()]: {
        fontSize: 20,
        lineHeight: '28px'
      }
    }
  }),
  {
    name: 'StablecoinCollateral'
  }
);
