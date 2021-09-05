import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    block: {
      marginBottom: 216
    },

    titleWrap: {
      maxWidth: 1100,
      marginBottom: 64,

      [theme.breakpoints.md()]: {
        bottom: 80
      }
    },

    title: {
      marginBottom: 24
    },

    subtitle: {
      maxWidth: 872
    },

    actions: {
      width: '100%',
      height: 82,
      fontSize: 16,
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      background: theme.colors.proposalPlate,
      borderRadius: 16,
      marginBottom: 16,
      padding: '0 32px',

      [theme.breakpoints.md()]: {
        borderRadius: 24,
        height: 88,
        fontSize: 20,
        lineHeight: '28px'
      }
    },

    actionsButton: {
      color: theme.colors.blue2,

      '&:nth-child(2)': {
        marginLeft: 16
      },

      '&:last-child': {
        marginLeft: 'auto'
      }
    }
  }),
  {
    name: 'VotingInfo'
  }
);
