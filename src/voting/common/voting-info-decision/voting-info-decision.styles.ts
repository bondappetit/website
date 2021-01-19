import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoDecisionStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      marginBottom: 32,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    },

    decision: {
      display: 'grid',
      gridGap: 24,

      [theme.breakpoints.md()]: {
        gridGap: 32,
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
      }
    },

    decisionCard: {
      border: 'none',

      [theme.breakpoints.md()]: {
        minHeight: 400,
        padding: 20,
        border: `1px solid ${theme.colors.primary}`
      },

      [theme.breakpoints.lg()]: {
        padding: 40
      }
    },

    decisionCardTitle: {
      marginBottom: 16
    }
  }),
  {
    name: 'VotingInfoDecision'
  }
);
