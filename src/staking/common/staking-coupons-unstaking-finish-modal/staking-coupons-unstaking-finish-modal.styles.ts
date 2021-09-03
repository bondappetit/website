import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingCouponsUnstakingFinishModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },

    content: {
      margin: 'auto'
    },

    votesDeligated: {
      color: theme.colors.green1
    },

    button: {
      marginTop: 'auto',
      background: theme.colors.green1,
      color: theme.colors.white,
      borderColor: theme.colors.green1
    }
  }),
  {
    name: 'StakingCouponsUnstakingFinishModal'
  }
);
