import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useBagBlocksStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridGap: 24,

      [theme.breakpoints.lg()]: {
        gridGap: 40,
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }
    },

    swapIcon: {
      height: 40,
      width: 40,

      '&:not(:last-child)': {
        marginRight: 8
      }
    },

    coinIcon: {
      width: 32,
      height: 32,

      '&:not(:last-child)': {
        marginRight: 16
      }
    }
  }),
  {
    name: 'BagBlocks'
  }
);
