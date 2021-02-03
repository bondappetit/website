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
      maxWidth: 1362,
      margin: '0 auto 48px',

      [theme.breakpoints.lg()]: {
        gridGap: 128,
        gridTemplateColumns: '1fr 1fr 1fr'
      }
    },

    mobileLink: {
      margin: '0 auto 45px',

      [theme.breakpoints.md()]: {
        display: 'none'
      }
    },

    desktopLink: {
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    },

    mobileCircles: {
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      marginLeft: -16,
      marginRight: -16,

      [theme.breakpoints.md()]: {
        display: 'none'
      }
    },

    circle: {
      minWidth: 136,
      height: 136,
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: '50%',
      margin: '0 17px'
    }
  }),
  {
    name: 'MainCollateral'
  }
);
