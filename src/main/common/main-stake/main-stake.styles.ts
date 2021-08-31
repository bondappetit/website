import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStakeStyles = createUseStyles(
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
      padding: '40px 32px',

      [theme.breakpoints.lg()]: {
        padding: '80px 64px'
      }
    },

    cardTitle: {
      marginBottom: 8
    },

    cardSubtitle: {
      maxWidth: 400,
      margin: '0 auto 30px',

      [theme.breakpoints.lg()]: {
        margin: '0 auto 56px'
      }
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
    },

    table: {
      marginBottom: 64,
      maxWidth: 'calc(100vw - 96px)'
    },

    tableRow: {
      borderColor: rgba(theme.colors.primary, 0.16),

      '&:first-child': {
        borderColor: rgba(theme.colors.primary, 0.16)
      }
    },

    tableCell: {
      whiteSpace: 'nowrap',

      '&:first-child': {
        paddingLeft: 0
      },

      '&:last-child': {
        paddingRight: 0
      }
    },

    stake: {
      margin: '0 auto',
      maxWidth: 240,
      width: '100%'
    }
  }),
  {
    name: 'MainStake'
  }
);
