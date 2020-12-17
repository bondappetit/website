import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingListStyles = createUseStyles(
  (theme: Theme) => ({
    staking: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 10,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    }
  }),
  {
    name: 'StackingList'
  }
);
