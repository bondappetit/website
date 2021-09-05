import { createUseStyles } from 'react-jss';

export const useStakingCouponsDescriptionModalStyles = createUseStyles(
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

    button: {
      marginTop: 'auto'
    },

    list: {
      margin: 0,
      paddingLeft: 25
    }
  },
  {
    name: 'StakingCouponsDescriptionModal'
  }
);
