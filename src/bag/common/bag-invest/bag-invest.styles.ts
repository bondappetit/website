import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBagInvestStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    grid: {
      display: 'grid',
      gridGap: 40,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    litpaper: {
      [theme.breakpoints.md()]: {
        minHeight: 379,
        height: 'auto'
      }
    },

    contacts: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 240,

      [theme.breakpoints.md()]: {
        marginTop: -24,
        height: 'auto'
      }
    }
  }),
  {
    name: 'BagInvest'
  }
);
