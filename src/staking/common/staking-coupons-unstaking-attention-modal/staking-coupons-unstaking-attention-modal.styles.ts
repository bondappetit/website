import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingCouponsUnstakingAttentionModalStyles = createUseStyles(
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

    button: {
      marginTop: 'auto',
      color: theme.colors.white,
      background: theme.colors.red,
      borderColor: theme.colors.red
    },

    attention: {
      color: theme.colors.red
    }
  }),
  {
    name: 'StakingCouponsUnstakingAttentionModal'
  }
);
