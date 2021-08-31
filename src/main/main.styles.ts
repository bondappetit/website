import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '0 16px 120px',

      [theme.breakpoints.md()]: {
        padding: '0 64px 240px'
      }
    },

    section: {
      marginBottom: 120,

      [theme.breakpoints.md()]: {
        marginBottom: 240
      }
    },

    newsTitle: {
      maxWidth: 800,
      marginBottom: 40,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    },

    col: {
      width: '50%'
    },

    articlesWrap: {
      marginBottom: 40
    },

    articles: {
      display: 'grid',
      gridGap: 16,

      [theme.breakpoints.md()]: {
        gridGap: 40,
        gridTemplateColumns: '1fr 1fr'
      }
    }
  }),
  {
    name: 'Main'
  }
);
