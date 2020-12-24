import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingListStyles = createUseStyles(
  (theme: Theme) => ({
    header: {
      marginBottom: 104
    },

    title: {
      maxWidth: 1200,
      margin: '0 auto 40px'
    },

    links: {
      margin: 'auto',
      width: 300,

      '& > *:first-child': {
        marginRight: 64
      },

      [theme.breakpoints.sm()]: {
        width: 467
      },

      [theme.breakpoints.md()]: {
        width: 520
      },

      [theme.breakpoints.lg()]: {
        width: 754
      }
    },

    staking: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 48,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    skeleton: {
      minHeight: 360
    }
  }),
  {
    name: 'StackingList'
  }
);
