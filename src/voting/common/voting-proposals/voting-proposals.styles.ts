import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingProposalsStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridGap: 16
    },

    proposal: {
      width: '100%',
      backgroundColor: theme.colors.proposalPlate,
      flexWrap: 'wrap',
      borderRadius: 16,
      padding: 16,

      [theme.breakpoints.md()]: {
        padding: 32,
        justifyContent: 'space-between',
        borderRadius: 24
      }
    },

    proposalSkeleton: {
      height: 88
    },

    proposalTitle: {
      width: '100%',

      [theme.breakpoints.md()]: {
        width: 'calc(100% - 200px)'
      }
    }
  }),
  {
    name: 'VotingProposals'
  }
);