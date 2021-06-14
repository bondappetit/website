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
      border: `1px solid ${theme.colors.primary}`,
      width: 200,
      height: 72,
      margin: 'auto',

      [theme.breakpoints.md()]: {
        flexDirection: 'column',
        width: 'auto',
        height: 216,
        border: `2px solid ${theme.colors.primary}`,
        margin: 'unset'
      }
    },

    circle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: 40,
      borderRadius: '50%',
      fontSize: 20,
      lineHeight: '28px',
      border: `1px solid ${theme.colors.primary}`,
      cursor: 'pointer',

      '&:not(:last-child)': {
        marginRight: 8
      },

      [theme.breakpoints.md()]: {
        '&:not(:last-child)': {
          marginRight: 0,
          marginBottom: 8
        }
      }
    },

    green: {
      display: 'flex',
      backgroundColor: theme.colors.green1,
      color: theme.colors.black
    },

    red: {
      display: 'flex',
      backgroundColor: theme.colors.red,
      color: theme.colors.black
    },

    yellow: {
      display: 'flex',
      backgroundColor: theme.colors.yellow,
      color: theme.colors.black
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
