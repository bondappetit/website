import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useFullpageModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.primary,
      width: '100%',
      height: '100%'
    },

    header: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 16px',

      [theme.breakpoints.md()]: {
        padding: '12px 32px'
      }
    },

    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 64px)',

      [theme.breakpoints.md()]: {
        height: 'calc(100vh - 88px)'
      }
    }
  }),
  {
    name: 'FullpageModal'
  }
);
