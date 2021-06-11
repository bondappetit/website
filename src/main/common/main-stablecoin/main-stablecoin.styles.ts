import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStablecoinStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.lg()]: {
        margin: 0,
        padding: 0
      },

      [theme.breakpoints.up(1920)]: {
        backgroundSize: 'contain',
        minHeight: '100vh'
      }
    },

    title: {
      marginBottom: 48,
      maxWidth: 872
    },

    link: {
      opacity: 0.4
    },

    total: {
      fontSize: 40,
      lineHeight: '48px',
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        fontSize: 80,
        lineHeight: '88px'
      }
    },

    actions: {
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      gridGap: 12,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '240px 240px'
      }
    },

    button: {
      maxWidth: 240,
      width: '100%'
    },

    grid: {
      display: 'grid',
      gridGap: 40,

      [theme.breakpoints.lg()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px 0'
    },

    cardContent: {
      margin: 'auto 0'
    },

    swap: {
      marginTop: 24
    },

    swapButton: {
      color: theme.colors.blue2
    }
  }),
  {
    name: 'MainStablecoin'
  }
);
