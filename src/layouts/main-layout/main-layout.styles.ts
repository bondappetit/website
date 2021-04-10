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
    },

    profileButton: {
      marginRight: 16,
      display: 'none',

      [theme.breakpoints.lg()]: {
        display: 'block'
      }
    },

    profile: {
      border: 'none',
      height: 'calc(100% - 138px)',
      width: 'calc(100% - 8px)',
      top: 138,
      left: 4,
      right: 4,
      position: 'fixed',
      background: theme.colors.secondary,
      zIndex: 100
    }
  }),
  {
    name: 'MainLayout'
  }
);
