import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralProtocolStateStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      boxSizing: 'border-box',
      borderRadius: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      [theme.breakpoints.md()]: {
        height: 216,
        border: `2px solid ${theme.colors.primary}`
      }
    },

    circle: {
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: 160,
      height: 48,
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 16,
      cursor: 'pointer',

      '&:not(:last-child)': {
        marginBottom: 8
      },

      [theme.breakpoints.md()]: {
        display: 'flex',
        height: 40,
        width: 40,
        borderRadius: '50%',
        fontSize: 20,
        lineHeight: '28px'
      }
    },

    green: {
      display: 'flex',
      backgroundColor: theme.colors.green1
    },

    red: {
      display: 'flex',
      backgroundColor: theme.colors.red
    },

    yellow: {
      display: 'flex',
      backgroundColor: theme.colors.yellow
    },

    tippy: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      padding: 16,
      borderRadius: 16
    }
  }),
  {
    name: 'CollateralProtocolState'
  }
);
