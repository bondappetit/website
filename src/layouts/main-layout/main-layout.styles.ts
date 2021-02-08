import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainLayoutStyles = createUseStyles(
  (theme: Theme) => ({
    toggleTheme: {
      marginRight: 19,
      display: 'none',

      [theme.breakpoints.lg()]: {
        display: 'flex'
      }
    }
  }),
  {
    name: 'MainLayout'
  }
);
