import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useTypographyStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      margin: 0,
      fontFamily: 'inherit',
      color: 'currentColor',
      letterSpacing: '-0.02em',
      fontWeight: 'normal'
    },

    h1: {
      fontSize: 28,
      lineHeight: '36px',

      [theme.breakpoints.md()]: {
        fontSize: 40,
        lineHeight: '48px'
      },

      [theme.breakpoints.lg()]: {
        fontSize: 64,
        lineHeight: '72px'
      }
    },

    h2: {
      fontSize: 20,
      lineHeight: '28px',

      [theme.breakpoints.md()]: {
        fontSize: 30,
        lineHeight: '38px'
      },

      [theme.breakpoints.lg()]: {
        fontSize: 40,
        lineHeight: '48px'
      }
    },

    h3: {
      fontSize: 20,
      lineHeight: '28px',

      [theme.breakpoints.md()]: {
        fontSize: 26,
        lineHeight: '34px'
      },

      [theme.breakpoints.lg()]: {
        fontSize: 32,
        lineHeight: '40px'
      }
    },

    h4: {
      fontSize: 16,
      lineHeight: '24px',

      [theme.breakpoints.md()]: {
        fontSize: 18,
        lineHeight: '26px'
      },

      [theme.breakpoints.lg()]: {
        fontSize: 24,
        lineHeight: '32px'
      }
    },

    h5: {
      fontSize: 16,
      lineHeight: '20px',

      [theme.breakpoints.lg()]: {
        fontSize: 20,
        lineHeight: '28px'
      }
    },

    h6: {},

    body1: {
      fontSize: 16,
      lineHeight: '24px'
    },

    body2: {
      fontSize: 14,
      lineHeight: '20px'
    },

    subtitle1: {},

    subtitle2: {},

    inherit: {},

    light: {
      fontWeight: 400
    },

    normal: {},

    bold: {
      fontWeight: 700
    },

    left: {
      textAlign: 'left'
    },

    center: {
      textAlign: 'center'
    },

    right: {
      textAlign: 'right'
    }
  }),
  {
    name: 'Typography'
  }
);
