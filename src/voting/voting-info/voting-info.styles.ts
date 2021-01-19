import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '64px 16px 104px',

      [theme.breakpoints.md()]: {
        padding: '104px 40px 200px'
      }
    }
  }),
  {
    name: 'VotingInfo'
  }
);
