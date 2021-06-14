import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinHowItWorksStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.lg()]: {
        height: 698
      }
    },

    swapLink: {
      color: theme.colors.blue2
    },

    swap: {
      marginTop: 20,
      width: '100%'
    }
  }),
  {
    name: 'StablecoinHowItWorks'
  }
);
