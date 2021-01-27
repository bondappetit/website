import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinEllipseStyles = createUseStyles(
  (theme: Theme) => ({
    ellipse: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '85%',
      marginBottom: 77,

      [theme.breakpoints.lg()]: {
        backgroundSize: '105%',
        backgroundImage: `url(${theme.images.ellipseDesktop})`,
        minHeight: 543,
        paddingTop: 94
      },

      [theme.breakpoints.up(1600)]: {
        backgroundSize: '85%'
      }
    },

    title: {
      marginBottom: 32,
      maxWidth: 1200,
      margin: '0 auto',

      [theme.breakpoints.lg()]: {
        fontSize: 64,
        lineHeight: '72px',
        whiteSpace: 'pre'
      }
    },

    info: {
      marginBottom: 48,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      [theme.breakpoints.md()]: {
        flexDirection: 'row'
      }
    },

    actions: {
      textAlign: 'center',

      '& *:first-child': {
        marginRight: 12
      }
    },

    subtext: {
      maxWidth: 960,
      margin: 'auto'
    },

    supply: {
      [theme.breakpoints.md()]: {
        marginRight: 32
      }
    },

    skeleton: {
      width: 150
    }
  }),
  {
    name: 'StablecoinEllipse'
  }
);
