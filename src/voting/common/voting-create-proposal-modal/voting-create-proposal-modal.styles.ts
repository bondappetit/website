import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingCreateProposalModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },

    content: {
      margin: '0 0 auto',

      '& > *:not(:last-child)': {
        marginBottom: 16
      }
    },

    button: {
      marginTop: 'auto',
      fontSize: 24,
      lineHeight: '32px',

      [theme.breakpoints.md()]: {
        fontSize: 32,
        lineHeight: '40px'
      }
    },

    attention: {
      marginBottom: 16,
      color: theme.colors.red
    }
  }),
  {
    name: 'VotingCreateProposalModal'
  }
);
