import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingProposalListStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      maxWidth: 800,
      margin: '0 auto',
      textAlign: 'center',
      padding: '64px 16px',

      [theme.breakpoints.md()]: {
        padding: '64px 0'
      }
    },

    header: {
      marginBottom: 80
    },

    createProposal: {
      border: `1px solid ${rgba(theme.colors.primary, 0.24)}`,
      fontSize: 20,
      lineHeight: '28px',
      padding: 32,
      width: '100%',
      marginBottom: 16
    },

    delegateTo: {
      color: theme.colors.darkBlue
    },

    votesSkeleton: {
      margin: '0 auto 16px',
      maxWidth: 150,
      height: 24
    },

    delegatesSkeleton: {
      margin: '0 auto',
      maxWidth: 388,
      height: 24
    },

    list: {
      '&:not(:last-child)': {
        marginBottom: 40
      }
    }
  }),
  {
    name: 'VotingProposalList'
  }
);
