import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBagInvestStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    grid: {
      display: 'grid',
      gridGap: 16,
      marginTop: -20,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '206px 386px'
      }
    },

    litpaper: {},

    contacts: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      [theme.breakpoints.md()]: {
        height: 'auto'
      }
    }
  }),
  {
    name: 'BagInvest'
  }
);
