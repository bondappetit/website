import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStablecoinHowItWorksStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.md()]: {
        height: 598
      }
    },

    swap: {
      color: theme.colors.blue2
    }
  }),
  {
    name: 'MainStablecoinHowItWorks'
  }
);
