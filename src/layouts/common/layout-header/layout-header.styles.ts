import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutHeaderStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: '10px 16px',
      justifyContent: 'space-between',

      [theme.breakpoints.lg()]: {
        padding: '12px 32px',
        justifyContent: 'flex-start'
      }
    },

    col: {
      display: 'flex'
    },

    logo: {
      justifyContent: 'center',
      display: 'flex',
      width: '33.33%'
    },

    leftButton: {
      justifyContent: 'flex-start',
      flexBasis: '5%',
      order: -1
    },

    center: {
      order: 2,

      [theme.breakpoints.lg()]: {
        flex: 1,
        order: 'unset'
      }
    },

    menu: {
      display: 'none',

      [theme.breakpoints.lg()]: {
        display: 'flex'
      }
    },

    menuButton: {
      display: 'block',

      [theme.breakpoints.lg()]: {
        display: 'none'
      }
    },

    rightButton: {
      justifyContent: 'flex-end',
      flexBasis: '15%',
      order: 1,

      [theme.breakpoints.lg()]: {
        order: 'unset'
      }
    },

    isInvest: {
      order: 2,

      [theme.breakpoints.lg()]: {
        order: 'unset'
      }
    }
  }),
  {
    name: 'LayoutHeader'
  }
);
