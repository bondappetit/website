import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common/theme/theme';

export const useStackingLockFormStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      textAlign: 'center'
    },

    max: {
      marginBottom: 68
    },

    maxButton: {
      color: theme.colors.darkBlue
    },

    uniswapLink: {
      marginBottom: 16
    },

    tooltip: {
      backgroundColor: theme.colors.error,
      color: 'white',
      borderRadius: 8,
      padding: 8,
      fontSize: 14,
      lineHeight: '20px',
      transition: 'none'
    },

    input: {
      color: theme.colors.grey,
      textAlign: 'center'
    }
  }),
  {
    name: 'StackingLockForm'
  }
);
