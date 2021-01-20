import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoHowToStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      marginBottom: 32,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    },

    howToGetList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      [theme.breakpoints.md()]: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row'
      }
    },

    howToGetCard: {
      maxWidth: 632,
      width: '100%',
      padding: [48, 23],
      margin: [18, 0],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      [theme.breakpoints.md()]: {
        padding: [104, 0, 48],
        margin: [0, 24]
      }
    },

    howToGetCardText: {
      maxWidth: 400,
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        marginBottom: 120
      }
    }
  }),
  {
    name: 'VotingInfoHowTo'
  }
);
