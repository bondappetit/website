import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingDetailStyles = createUseStyles(
  (theme: Theme) => ({
    stacking: {
      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    header: {
      marginBottom: 48
    },

    row: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 48,
      textAlign: 'center',

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '424px 1fr'
      }
    },

    card: {
      padding: '80px 48px 40px',

      [theme.breakpoints.lg()]: {
        padding: '80px 48px 40px'
      }
    },

    cardFlex: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    usd: {
      color: theme.colors.grey
    },

    unlock: {
      margin: '30px auto 0',
      maxWidth: 429,

      [theme.breakpoints.lg()]: {
        margin: 'auto auto 0'
      }
    },

    stackingBalance: {
      display: 'grid',
      gridGap: 40,

      [theme.breakpoints.sm()]: {
        gridGap: 0,
        gridTemplateColumns: '1fr 1fr'
      }
    },

    unstackeAndClaim: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 'auto'
    }
  }),
  {
    name: 'StackingDetail'
  }
);
