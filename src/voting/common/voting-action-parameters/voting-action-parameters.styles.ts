import { createUseStyles } from 'react-jss';

export const useVotingActionParametersStyles = createUseStyles(
  {
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

    input: {
      display: 'block',

      '&:not(:last-child)': {
        marginBottom: 32
      }
    }
  },
  {
    name: 'VotingActionParameters'
  }
);
