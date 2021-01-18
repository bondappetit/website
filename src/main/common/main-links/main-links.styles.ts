import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainLinksStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    link: {
      display: 'flex',
      alignItems: 'center',
      margin: [0, 9],

      [theme.breakpoints.up(375)]: {
        margin: [0, 16]
      },

      [theme.breakpoints.md()]: {
        margin: [0, 42]
      }
    },

    linkIcon: {
      marginRight: 8
    },

    linkTitle: {
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    }
  }),
  {
    name: 'MainLinks'
  }
);
