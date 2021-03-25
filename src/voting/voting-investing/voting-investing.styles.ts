import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInvestingStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      width: '100%'
    },

    attention: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },

    attentionContent: {
      margin: '0 0 auto',

      '& > *:not(:last-child)': {
        marginBottom: 16
      }
    },

    attentionButton: {
      marginTop: 'auto',
      fontSize: 24,
      lineHeight: '32px',

      [theme.breakpoints.md()]: {
        fontSize: 32,
        lineHeight: '40px'
      }
    },

    attentionRed: {
      color: theme.colors.red
    }
  }),
  {
    name: 'VotingInvesting'
  }
);
