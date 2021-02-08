import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainCollateralStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    title: {
      maxWidth: 800,
      margin: '0 auto',

      [theme.breakpoints.md()]: {
        margin: '0 auto 45px'
      }
    },

    cards: {
      display: 'grid',
      gridGap: 32,
      maxWidth: 1120,
      margin: '0 auto 48px',

      [theme.breakpoints.lg()]: {
        gridGap: 128,
        gridTemplateColumns: '1fr 1fr 1fr'
      }
    }
  }),
  {
    name: 'MainCollateral'
  }
);
