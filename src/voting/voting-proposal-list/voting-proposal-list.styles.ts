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
      width: '100%'
    },

    proposal: {
      padding: 32,
      width: '100%',
      backgroundColor: theme.colors.darkGrey,
      borderRadius: 24,
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },

    proposalSkeleton: {
      height: 88
    },

    proposalTitle: {
      width: 'calc(100% - 200px)'
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
      display: 'grid',
      gridGap: 16,

      '&:not(:last-child)': {
        marginBottom: 40
      }
    }
  }),
  {
    name: 'VotingProposalList'
  }
);
