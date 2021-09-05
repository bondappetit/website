import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinHeaderStyles = createUseStyles(
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
        maxWidth: 969,
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
    name: 'StablecoinHeader'
  }
);
