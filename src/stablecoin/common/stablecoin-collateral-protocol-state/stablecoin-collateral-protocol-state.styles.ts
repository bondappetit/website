import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinCollateralProtocolStateStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      boxSizing: 'border-box',
      borderRadius: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',

      [theme.breakpoints.md()]: {
        flexDirection: 'column',
        margin: 'unset'
      }
    },

    circle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: 40,
      fontSize: 20,
      lineHeight: '28px',
      opacity: 0.16
    },

    green: {
      color: theme.colors.green1,
      opacity: 1
    },

    red: {
      color: theme.colors.red,
      opacity: 1
    },

    yellow: {
      color: theme.colors.yellow,
      opacity: 1
    },

    tippy: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      padding: 16,
      borderRadius: 16
    }
  }),
  {
    name: 'StablecoinCollateralProtocolState'
  }
);
