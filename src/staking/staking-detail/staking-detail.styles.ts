import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingDetailStyles = createUseStyles(
  (theme: Theme) => ({
    staking: {
      padding: '40px 16px 120px',

      [theme.breakpoints.md()]: {
        padding: '48px 64px 160px',
        gridTemplateColumns: '1fr 1fr'
      }
    },

    header: {
      marginBottom: 16,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    },

    headerIcon: {
      marginBottom: -4,
      width: 27,
      height: 27,

      [theme.breakpoints.md()]: {
        width: 32,
        height: 32
      }
    },

    row: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',

      [theme.breakpoints.lg()]: {
        display: 'grid',
        gridGap: 48,
        gridTemplateColumns: '424px 1fr'
      }
    },

    card: {
      padding: 40,

      '&:not(:first-child)': {
        marginBottom: 16
      },

      [theme.breakpoints.lg()]: {
        padding: '80px 48px 40px',

        '&:not(:first-child)': {
          marginBottom: 0
        }
      }
    },

    cardFlex: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      order: -1,

      [theme.breakpoints.lg()]: {
        order: 'unset'
      }
    },

    cardTitle: {
      marginBottom: 8
    },

    usd: {
      color: theme.colors.grey
    },

    unlock: {
      margin: '0 auto 0',
      maxWidth: 429
    },

    stakingBalance: {
      [theme.breakpoints.sm()]: {
        display: 'grid',
        gridGap: 0,
        gridTemplateColumns: '1fr 1fr'
      }
    },

    unstakeAndClaim: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',

      '&:first-child': {
        marginBottom: 64
      },

      [theme.breakpoints.sm()]: {
        '&:first-child': {
          marginBottom: 0
        }
      }
    },

    attention: {
      marginTop: 16,
      minHeight: 40
    },

    marginBottom: {
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        marginBottom: 64
      }
    },

    marginBottom2: {
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        marginBottom: 88
      }
    },

    empty: {
      maxWidth: 300,
      width: '100%',
      margin: '0 auto'
    }
  }),
  {
    name: 'StakingDetail'
  }
);
