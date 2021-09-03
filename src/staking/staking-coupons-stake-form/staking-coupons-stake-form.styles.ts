import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common/theme/theme';

export const useStakingCouponsStakeFormStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      textAlign: 'center',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column'
    },

    max: {
      marginBottom: 8,

      [theme.breakpoints.md()]: {
        marginBottom: 0
      }
    },

    link: {
      color: theme.colors.blue2
    },

    input: {
      textAlign: 'center',
      margin: 0,
      fontSize: 24,
      lineHeight: '32px',

      [theme.breakpoints.md()]: {
        fontSize: 32,
        lineHeight: '40px'
      }
    },

    skeleton: {
      marginTop: 'auto',
      minHeight: 40
    },

    button: {
      margin: 'auto auto 0 auto'
    }
  }),
  {
    name: 'StakingLockForm'
  }
);
