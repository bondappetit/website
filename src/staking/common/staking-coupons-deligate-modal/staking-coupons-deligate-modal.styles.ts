import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingCouponsDeligateModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },

    content: {
      margin: '0 0 auto',

      '& > *:not(:last-child)': {
        marginBottom: 16
      }
    },

    steps: {
      opacity: 0.4
    },

    button: {
      marginTop: 'auto',
      marginBottom: 8
    },

    continue: {
      color: theme.colors.white,
      background: theme.colors.red,
      borderColor: theme.colors.red
    }
  }),
  {
    name: 'StakingCouponsDeligateModal'
  }
);
