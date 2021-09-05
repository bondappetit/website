import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useButtonStyles = createUseStyles(
  (theme: Theme) => ({
    button: {
      borderRadius: 16,
      letterSpacing: '-0.02em',
      position: 'relative',

      '& *': {
        verticalAlign: 'middle'
      }
    },

    primary: {
      backgroundColor: theme.colors.primary,
      border: `1px solid ${theme.colors.primary}`,
      color: theme.colors.secondary,

      '&$outlined': {
        color: theme.colors.primary
      }
    },

    secondary: {},

    contained: {},

    outlined: {
      backgroundColor: 'transparent'
    },

    small: {
      padding: '4px 12px',
      fontSize: 16,
      lineHeight: '24px',
      borderRadius: 8
    },

    medium: {
      padding: '15px 27px',
      fontSize: 24,
      lineHeight: '32px'
    },

    large: {
      padding: '11px 40px',
      fontSize: 32,
      lineHeight: '40px'
    },

    loading: {
      pointerEvents: 'none'
    },

    loader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto'
    },

    loadingChildren: {
      opacity: 0
    }
  }),
  {
    name: 'Button'
  }
);
