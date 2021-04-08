import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStablecoinStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      backgroundImage: `url(${theme.images.ellipseMobile})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 527,
      marginLeft: -16,
      marginRight: -16,
      padding: '0 16px',

      [theme.breakpoints.md()]: {
        backgroundImage: `url(${theme.images.ellipseMain})`,
        backgroundPosition: 'center',
        backgroundSize: '105%',
        minHeight: 784,
        marginLeft: -64,
        marginRight: -64,
        padding: '0 64px'
      },

      [theme.breakpoints.lg()]: {
        margin: 0,
        padding: 0
      },

      [theme.breakpoints.up(1920)]: {
        backgroundSize: 'contain',
        minHeight: '100vh'
      }
    },

    title: {
      maxWidth: 800,
      margin: '0 auto 9px'
    },

    total: {
      fontSize: 40,
      lineHeight: '48px',
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        fontSize: 80,
        lineHeight: '88px'
      }
    },

    actions: {
      marginBottom: 48,
      display: 'flex',
      justifyContent: 'center',

      '& *:first-child': {
        marginRight: 12
      }
    },

    button: {
      maxWidth: 240,
      width: '100%'
    }
  }),
  {
    name: 'MainStablecoin'
  }
);
