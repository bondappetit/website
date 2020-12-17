import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingDetailStyles = createUseStyles(
  (theme: Theme) => ({
    staking: {
      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    row: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 10,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    card: {
      padding: 30
    }
  }),
  {
    name: 'StackingDetail'
  }
);
