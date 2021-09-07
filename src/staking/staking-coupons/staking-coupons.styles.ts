import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingCouponsStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridGap: 48,

      [theme.breakpoints.lg()]: {
        gridTemplateColumns: '424px 1fr'
      }
    },

    header: {
      order: -2,

      [theme.breakpoints.lg()]: {
        gridColumnStart: 1,
        gridColumnEnd: 3
      }
    },

    col: {
      padding: '64px 36px',
      minHeight: '384px'
    },

    unstakeClaim: {
      order: -1,
      display: 'flex',
      flexWrap: 'wrap',

      [theme.breakpoints.lg()]: {
        order: 'unset'
      }
    },

    unstakeCol: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',

      [theme.breakpoints.md()]: {
        width: '50%'
      },

      '&:first-child': {
        marginBottom: 64,

        [theme.breakpoints.md()]: {
          marginBottom: 0
        }
      }
    },

    sum: {
      marginTop: 8,
      marginBottom: 4
    },

    claim: {
      marginTop: 'auto'
    },

    subSum: {
      opacity: 0.4,
      marginBottom: 'auto'
    },

    unstakingDate: {
      marginBottom: 20
    }
  }),
  {
    name: 'StakingCoupons'
  }
);
