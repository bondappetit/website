import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useButtonStyles = createUseStyles(
  (theme: Theme) => ({
    button: {
      borderRadius: 16,
      letterSpacing: '-0.02em',
      padding: '8px 40px',
      fontSize: 32,
      lineHeight: '40px',

      [theme.breakpoints.md()]: {
        fontSize: 40,
        lineHeight: '48px'
      }
    },

    primary: {
      backgroundColor: theme.colors.primary,
      border: `1px solid ${theme.colors.primary}`,
      color: theme.colors.secondary
    },

    secondary: {},

    contained: {},

    outlined: {
      backgroundColor: 'transparent'
    }
  }),
  {
    name: 'Button'
  }
);
