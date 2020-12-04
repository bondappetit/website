import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useVotingActionSelectStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },

    title: {
      marginBottom: 24
    },

    optionsWrap: {
      margin: '0 -16px',
      overflowY: 'auto',
      maxHeight: 392
    },

    options: {
      display: 'flex',
      flexDirection: 'column'
    },

    option: {
      justifyContent: 'flex-start',
      padding: '10px 16px',

      [theme.mixins.hover()]: {
        '&:hover': {
          borderRadius: 8,
          background: theme.colors.lightGrey
        }
      }
    }
  }),
  {
    name: 'VotingActionSelect'
  }
);
