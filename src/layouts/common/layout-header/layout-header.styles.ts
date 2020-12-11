import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutHeaderStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: '0 16px',

      [theme.breakpoints.md()]: {
        padding: '12px 32px'
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
      flexBasis: '5%'
    },

    menu: {
      flex: 1
    },

    rightButton: {
      justifyContent: 'flex-end',
      flexBasis: '15%'
    }
  }),
  {
    name: 'LayoutHeader'
  }
);
