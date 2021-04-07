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
      height: '100vh',
      width: 'calc(100% - 8px)',
      position: 'absolute',
      background: theme.colors.secondary,
      zIndex: 100
    }
  }),
  {
    name: 'MainLayout'
  }
);
