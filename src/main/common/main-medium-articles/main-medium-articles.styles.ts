import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainMediumArticlesStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '24px 24px 80px',

      [theme.breakpoints.md()]: {
        padding: '40px 64px 96px'
      }
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 40,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    },

    icon: {
      marginRight: 24,
      width: 32,
      height: 32,

      [theme.breakpoints.md()]: {
        marginRight: 16
      }
    },

    title: {}
  }),
  {
    name: 'MainMediumArticles'
  }
);
