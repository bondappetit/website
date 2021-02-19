import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainHowItWorksStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      paddingTop: '69.25%',
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 16,
      zIndex: 0,
      margin: '0 auto',

      [theme.breakpoints.sm()]: {
        paddingTop: '48.25%'
      },

      [theme.breakpoints.md()]: {
        borderRadius: 24,
        width: '80vw',
        paddingTop: '38.25%'
      }
    },

    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1
    },

    cover: {
      objectFit: 'cover'
    },

    buttonWrap: {
      cursor: 'pointer',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      left: 0,
      zIndex: 1,
      width: '100%',
      height: '100%'
    },

    button: {
      alignItems: 'center',
      margin: 'auto',
      height: 48,
      background: theme.colors.secondary,
      border: `1px solid ${theme.colors.primary}`,
      padding: '8px 16px 8px 8px',
      borderRadius: 100,

      [theme.breakpoints.md()]: {
        height: 56
      }
    },

    buttonPlayIcon: {
      marginRight: 8,
      width: 32,
      height: 32,

      [theme.breakpoints.md()]: {
        width: 40,
        height: 40
      }
    }
  }),
  {
    name: 'MainHowItWorks'
  }
);
