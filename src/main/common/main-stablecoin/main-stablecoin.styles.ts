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
      padding: '20px 14px',

      [theme.breakpoints.md()]: {
        padding: '60px 54px'
      },

      [theme.breakpoints.lg()]: {
        padding: '80px 74px'
      }
    },

    cardContent: {},

    cardSubtitle: {
      marginBottom: 16
    },

    chart: {
      minHeight: 202,
      marginBottom: 38
    },

    swap: {
      marginTop: 24
    },

    swapButton: {
      color: theme.colors.blue2
    },

    text: {
      padding: '20px 36px',

      [theme.breakpoints.sm()]: {
        padding: '40px 56px'
      },

      [theme.breakpoints.md()]: {
        padding: '80px 96px'
      }
    },

    cards: {
      display: 'grid',
      gridGap: 32,
      margin: '0 auto 48px'
    }
  }),
  {
    name: 'MainStablecoin'
  }
);
