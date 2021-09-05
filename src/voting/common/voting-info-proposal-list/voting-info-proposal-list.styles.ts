import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoProposalListStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      margin: '0 auto 24px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 48px'
      }
    },

    proposals: {
      marginBottom: 50
    },

    link: {
      opacity: 0.4
    }
  }),
  {
    name: 'VotingInfoProposalList'
  }
);
