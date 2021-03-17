import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '48px 16px 120px',

      [theme.breakpoints.md()]: {
        padding: '82px 64px 240px'
      }
    },

    staking: {
      marginBottom: 71,

      [theme.breakpoints.md()]: {
        marginBottom: 87
      }
    },

    stable: {
      marginBottom: 55
    },

    section: {
      marginBottom: 120,

      [theme.breakpoints.md()]: {
        marginBottom: 240
      }
    },

    audit: {
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    },

    steps: {
      margin: '0 -16px 120px',

      [theme.breakpoints.md()]: {
        margin: '0 -64px 240px'
      }
    },

    editor: {
      marginBottom: 160,

      [theme.breakpoints.md()]: {
        marginBottom: 240
      }
    },

    voting: {
      marginBottom: 160,

      [theme.breakpoints.md()]: {
        marginBottom: 204
      }
    },

    newsTitle: {
      maxWidth: 800,
      margin: '0 auto 40px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 48px'
      }
    },

    articles: {
      display: 'grid',
      gridGap: 16,

      [theme.breakpoints.md()]: {
        gridGap: 48,
        gridTemplateColumns: '1fr 1fr'
      }
    }
  }),
  {
    name: 'Main'
  }
);
