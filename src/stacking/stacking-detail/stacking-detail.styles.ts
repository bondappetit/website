import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingDetailStyles = createUseStyles((theme: Theme) => ({
  staking: {
    padding: '48px 16px 104px',

    [theme.breakpoints.md()]: {
      gridTemplateColumns: '1fr 1fr',
      padding: '82px 64px 160px'
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
}));
