import { createUseStyles } from 'react-jss';

export const useStakingCouponsLockModalStyles = createUseStyles(
  {
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
      marginTop: 'auto'
    }
  },
  {
    name: 'StakingCouponsLockModal'
  }
);
