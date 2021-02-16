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

      [theme.breakpoints.sm()]: {
        paddingTop: '48.25%'
      },

      [theme.breakpoints.md()]: {
        borderRadius: 24,
        paddingTop: '38.25%'
      }
    },

    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },

    buttonWrap: {
      cursor: 'pointer'
    },

    button: {
      alignItems: 'center',
      position: 'absolute',
      zIndex: 10,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      height: '3.5em',
      background: theme.colors.secondary,
      border: `1px solid ${theme.colors.primary}`,
      padding: 8,
      borderRadius: 100
    },

    buttonPlayIcon: {
      marginRight: 8
    }
  }),
  {
    name: 'MainHowItWorks'
  }
);
