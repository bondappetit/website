import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutLinksStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    link: {
      display: 'flex',
      alignItems: 'center',
      margin: [0, 5],

      [theme.breakpoints.up(375)]: {
        margin: [0, 10]
      },

      [theme.breakpoints.md()]: {
        margin: [0, 20]
      }
    },

    linkIcon: {
      marginRight: 4,
      width: 24,
      height: 24
    },

    linkTitle: {
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    }
  }),
  {
    name: 'LayoutLinks'
  }
);
