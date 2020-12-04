import { createUseStyles } from 'react-jss';

export const useVotingActionListStyles = createUseStyles(
  {
    root: {
      padding: 32
    },

    list: {
      marginBottom: 32
    },

    action: {
      display: 'flex',
      flexWrap: 'wrap',

      '&:not(:last-child)': {
        paddingBottom: 24
      }
    },

    actionTitle: {
      marginBottom: 4
    },

    editAction: {
      opacity: 0.64,
      marginRight: 8
    },

    number: {
      marginRight: 32
    },

    anotherAction: {
      fontSize: 20,
      lineHeight: '24px',
      borderRadius: 8,
      padding: '4px 12px'
    }
  },
  {
    name: 'VotingActionList'
  }
);
