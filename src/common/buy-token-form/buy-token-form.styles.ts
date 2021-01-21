import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBuyTokenFormStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      height: '100%'
    },

    investing: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    },

    input: {
      width: 58,

      '&:first-child': {
        marginLeft: 10,

        [theme.breakpoints.md()]: {
          marginLeft: 0,
          marginRight: 35
        }
      },

      [theme.breakpoints.md()]: {
        width: 135
      }
    },

    result: {
      width: '100%',
      marginTop: 64,

      [theme.breakpoints.md()]: {
        width: 210,
        marginTop: 17,
        marginLeft: 80,
        marginRight: 12
      }
    },

    button: {
      width: '100%',
      marginTop: 24,

      [theme.breakpoints.md()]: {
        width: 'auto',
        marginTop: 0
      }
    },

    tooltip: {
      backgroundColor: theme.colors.error,
      color: 'white',
      borderRadius: 8,
      padding: 8,
      fontSize: 14,
      lineHeight: '20px',
      transition: 'none'
    },

    disabled: {
      opacity: 0.8,
      pointerEvents: 'none'
    }
  }),
  {
    name: 'BuyTokenForm'
  }
);
