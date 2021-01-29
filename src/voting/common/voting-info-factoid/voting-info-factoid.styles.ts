import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoFactoidStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      maxWidth: 960,
      margin: '0 auto 104px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 160px'
      }
    },

    subtitle: {
      marginBottom: 42,

      [theme.breakpoints.md()]: {
        marginBottom: 40
      }
    },

    chart: {
      marginBottom: 32,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    },

    factoid: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: 0,
      margin: [0, 0, 104],

      [theme.breakpoints.md()]: {
        margin: [0, -24, 160]
      }
    },

    factoidItem: {
      width: '100%',
      marginBottom: 16,

      [theme.breakpoints.md()]: {
        padding: [0, 24],
        margin: 0,
        width: '33.33%'
      }
    },

    factoidItemContent: {
      display: 'flex',
      fontSize: 14,
      lineHeight: '20px',

      '& *:first-child': {
        marginRight: 8,
        width: 25,
        fontWeight: 400
      },

      '& *:last-child': {
        width: 'calc(100% - 25px)'
      },

      [theme.breakpoints.md()]: {
        display: 'block',
        fontSize: 16,
        lineHeight: '24px',

        '& *:first-child': {
          marginRight: 0,
          fontWeight: 600
        }
      }
    }
  }),
  {
    name: 'VotingInfoFactoid'
  }
);
