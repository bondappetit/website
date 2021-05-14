import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBagHeaderStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    },

    titleWrap: {
      width: '100%',
      marginBottom: 20,

      [theme.breakpoints.md()]: {
        maxWidth: 872,
        margin: 0
      }
    },

    title: {
      marginBottom: 16,

      [theme.breakpoints.md()]: {
        marginBottom: 24,
        textAlign: 'left'
      }
    },

    coin: {
      '--fill': theme.colors.secondary,
      width: 166,
      height: 160,
      order: -1,
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        order: 'unset',
        width: 286,
        height: 276,
        marginBottom: 0
      }
    },

    links: {
      display: 'flex',
      padding: 0,
      listStyle: 'none',
      opacity: 0.4,
      maxWidth: '100%',
      overflowX: 'auto',
      margin: 0,

      [theme.breakpoints.md()]: {
        maxWidth: 'none'
      }
    },

    linksItem: {
      whiteSpace: 'nowrap',

      '&:not(:last-child)': {
        marginRight: 16
      },

      [theme.breakpoints.md()]: {
        '&:not(:last-child)': {
          marginRight: 24
        }
      }
    }
  }),
  {
    name: 'BagHeader'
  }
);
