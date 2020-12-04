import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVoteButtonStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      border: '2px solid transparent',
      borderRadius: 16,
      width: '100%',
      padding: '38px 0'
    },

    voteFor: {
      borderColor: theme.colors.green,

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1,
          background: theme.colors.green
        }
      }
    },

    voteAgainst: {
      borderColor: theme.colors.red,

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1,
          background: theme.colors.red
        }
      }
    }
  }),
  {
    name: 'VoteButton'
  }
);
