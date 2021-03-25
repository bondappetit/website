import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingActionParametersStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      marginBottom: 40
    },

    button: {
      marginTop: 'auto'
    },

    inputs: {
      overflowY: 'auto',
      marginBottom: 10,
      maxHeight: 392
    },

    inputWrap: {
      position: 'relative',

      '&:not(:last-child)': {
        marginBottom: 32
      }
    },

    input: {
      display: 'block'
    },

    addPow: {
      position: 'absolute',
      right: 0,
      top: -26,
      fontSize: 29,
      zIndex: 100
    },

    option: {
      margin: '0 -16px',
      justifyContent: 'flex-start',
      padding: '10px 16px',

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1,
          borderRadius: 8,
          background: theme.colors.lightGrey,
          color: theme.colors.black
        }
      }
    },

    customInput: {
      marginTop: 26,
      height: 24
    }
  }),
  {
    name: 'VotingActionParameters'
  }
);
