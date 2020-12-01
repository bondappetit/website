import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingAddActionStyles = createUseStyles(
  (theme: Theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        width: 600
      }
    }
  }),
  {
    name: 'VotingAddAction'
  }
);
