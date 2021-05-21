import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainCollateralStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '20px 36px',

      [theme.breakpoints.sm()]: {
        padding: '40px 56px'
      },

      [theme.breakpoints.md()]: {
        padding: '80px 96px'
      }
    },

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
      margin: '0 auto 48px'
    }
  }),
  {
    name: 'MainCollateral'
  }
);
