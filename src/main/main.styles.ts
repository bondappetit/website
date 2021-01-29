import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStyles = createUseStyles(
  (theme: Theme) => ({
    staking: {
      marginBottom: 71,

      [theme.breakpoints.md()]: {
        marginBottom: 87
      }
    },

    stable: {
      marginBottom: 97,

      [theme.breakpoints.md()]: {
        marginBottom: 174
      }
    },

    collateral: {
      marginBottom: 120,

      [theme.breakpoints.md()]: {
        marginBottom: 200
      }
    },

    voting: {
      marginBottom: 160,

      [theme.breakpoints.md()]: {
        marginBottom: 240
      }
    },

    steps: {
      margin: '0 -16px 48px',

      [theme.breakpoints.md()]: {
        margin: '0 -64px 144px'
      }
    }
  }),
  {
    name: 'Main'
  }
);
