import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainNewsResourcesStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',

      [theme.breakpoints.sm()]: {
        flexWrap: 'nowrap'
      }
    },

    item: {
      marginBottom: 12,

      '&:not(:last-child)': {
        marginRight: 12
      },

      [theme.breakpoints.sm()]: {
        maxHeight: 64,
        marginBottom: 0
      }
    },

    img: {
      maxHeight: 64,
      maxWidth: '100%',

      [theme.breakpoints.sm()]: {
        maxHeight: 'none'
      }
    }
  }),
  {
    name: 'MainNewsResources'
  }
);
