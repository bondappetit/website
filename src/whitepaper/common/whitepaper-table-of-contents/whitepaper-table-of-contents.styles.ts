import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWhitepaperTableOfContentsStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      maxHeight: '100vh'
    },

    subMenuInactive: {
      display: 'none'
    },

    item: {
      '& $link': {
        opacity: 0.4
      },

      '&:not(:last-child)': {
        marginBottom: 16
      },

      '& ul': {
        marginTop: 16,
        paddingLeft: 16
      }
    },

    active: {
      '& > $link': {
        opacity: 1
      }
    },

    link: {
      justifyContent: 'flex-start',
      textAlign: 'left',

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1
        }
      }
    },

    arrow: {
      position: 'absolute',
      left: -28
    }
  }),
  {
    name: 'WhitepaperTableOfContents'
  }
);
