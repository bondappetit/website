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
    }
  }),
  {
    name: 'Main'
  }
);
