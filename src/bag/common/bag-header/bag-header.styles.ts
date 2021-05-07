import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBagHeaderStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        flexDirection: 'row'
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
      marginBottom: 24,
      textAlign: 'center',

      [theme.breakpoints.md()]: {
        textAlign: 'left'
      }
    },

    coin: {
      '--fill': theme.colors.secondary,
      width: 286,
      height: 276
    },

    links: {
      display: 'flex',
      padding: 0,
      listStyle: 'none',
      opacity: 0.4,
      flexDirection: 'column',
      maxWidth: 200,
      margin: 'auto',

      [theme.breakpoints.md()]: {
        flexDirection: 'row',
        maxWidth: 'none',
        margin: 0
      }
    },

    linksItem: {
      '&:not(:last-child)': {
        marginRight: 24
      }
    }
  }),
  {
    name: 'BagHeader'
  }
);
