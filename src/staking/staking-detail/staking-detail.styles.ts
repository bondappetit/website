import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingDetailStyles = createUseStyles(
  (theme: Theme) => ({
    staking: {
      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    header: {
      marginBottom: 16,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    },

    row: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 16,
      textAlign: 'center',

      [theme.breakpoints.md()]: {
        gridGap: 48,
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
      justifyContent: 'center',
      order: -1,

      [theme.breakpoints.lg()]: {
        order: 'unset'
      }
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

    stakingBalance: {
      display: 'grid',
      gridGap: 40,
      height: '100%',

      [theme.breakpoints.sm()]: {
        gridGap: 0,
        gridTemplateColumns: '1fr 1fr'
      }
    },

    unstakeAndClaim: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }),
  {
    name: 'StakingDetail'
  }
);
