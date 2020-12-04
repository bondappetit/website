import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useVotingDetailsBlockStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: 40
    },

    details: {
      padding: 32
    },

    line: {
      wordBreak: 'break-all',
      display: 'flex',

      '&:not(:last-child)': {
        marginBottom: 16
      }
    },

    lineId: {
      marginRight: 32
    },

    link: {
      color: theme.colors.darkBlue
    }
  }),
  {
    name: 'VotingDetailsBlock'
  }
);
