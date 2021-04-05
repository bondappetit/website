import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common/theme';

export const useInfoCardSuccessStyles = createUseStyles(
  (theme: Theme) => ({
    heading: {
      color: theme.colors.green
    },

    addToMetaMask: {
      marginBottom: 16
    }
  }),
  {
    name: 'InfoCardSuccess'
  }
);
