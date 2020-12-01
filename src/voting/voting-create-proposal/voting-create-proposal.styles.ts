import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingCreateProposalStyles = createUseStyles(
  (theme: Theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        maxWidth: 600
      }
    }
  }),
  {
    name: 'VotingCreateProposal'
  }
);
