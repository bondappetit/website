import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useVotingInvestingStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      width: '100%'
    },

    progress: {
      '&[value]': {
        WebkitAppearance: 'none',
        appearance: 'none',
        width: 400,
        height: 4,
        borderRadius: 8,

        '&::-webkit-progress-bar': {
          backgroundColor: theme.colors.pink,
          borderRadius: 8
        },

        '&::-webkit-progress-value': {
          backgroundColor: theme.colors.primary,
          borderRadius: 8
        }
      }
    }
  }),
  {
    name: 'VotingInvesting'
  }
);
