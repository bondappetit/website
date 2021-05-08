import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBagStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    header: {
      marginBottom: 80,

      [theme.breakpoints.md()]: {
        marginBottom: 104
      }
    },

    blocks: {
      marginBottom: 106,

      [theme.breakpoints.md()]: {
        marginBottom: 200
      }
    }
  }),
  {
    name: 'Bag'
  }
);
