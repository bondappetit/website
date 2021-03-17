import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainMediumArticlesStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '24px 24px 80px',

      [theme.breakpoints.md()]: {
        padding: '48px 48px 120px'
      }
    },

    icon: {
      marginBottom: 24,
      width: 32,
      height: 32,

      [theme.breakpoints.md()]: {
        width: 40,
        height: 40,
        marginBottom: 16
      }
    },

    title: {
      marginBottom: 40,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    }
  }),
  {
    name: 'MainMediumArticles'
  }
);
