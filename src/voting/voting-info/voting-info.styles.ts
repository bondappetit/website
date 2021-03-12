import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '64px 16px 104px',

      [theme.breakpoints.md()]: {
        padding: '104px 40px 200px'
      }
    },

    title: {
      margin: '0 auto 64px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 104px'
      }
    },

    block: {
      maxWidth: 1280,
      margin: 'auto'
    },

    proposals: {
      margin: '0 auto 104px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 160px'
      }
    },

    factoid: {
      margin: '0 auto 104px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 160px'
      }
    },

    decision: {
      marginBottom: 14,

      [theme.breakpoints.md()]: {
        margin: 'auto'
      }
    }
  }),
  {
    name: 'VotingInfo'
  }
);
