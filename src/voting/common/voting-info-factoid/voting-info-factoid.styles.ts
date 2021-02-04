import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoFactoidStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      maxWidth: 960,
      margin: '0 auto 40px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 80px'
      }
    },

    plate: {
      padding: '48px 16px',
      marginBottom: 40,

      [theme.breakpoints.md()]: {
        padding: 72,
        marginBottom: 80
      }
    },

    chart: {
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'flex',
        marginBottom: 48
      }
    },

    factoid: {
      display: 'flex',
      flexDirection: 'column',
      listStyle: 'none',
      padding: 0,
      margin: 0
    },

    factoidText: {
      display: 'grid',
      gridGap: 40,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 260px'
      },

      [theme.breakpoints.lg()]: {
        gridTemplateColumns: '1fr 360px'
      }
    },

    factoidItem: {
      width: '100%',

      '&:not(:last-child)': {
        marginBottom: 16,

        [theme.breakpoints.md()]: {
          marginBottom: 24
        }
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
