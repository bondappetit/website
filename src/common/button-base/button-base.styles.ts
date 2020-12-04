import { createUseStyles } from 'react-jss';
import { transitions } from 'polished';

import { Theme } from 'src/common';

export const useButtonBaseStyles = createUseStyles(
  (theme: Theme) => ({
    baseButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
      margin: 0,
      border: 0,
      backgroundColor: 'transparent',
      outline: 0,
      fontFamily: 'inherit',
      color: 'currentColor',
      textDecoration: 'none',
      ...transitions('opacity 0.3s ease'),

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 0.7
        },

        '&:active': {
          transform: 'translateY(1px)'
        }
      }
    },

    disabled: {
      pointerEvents: 'none',
      opacity: 0.6
    }
  }),
  {
    name: 'ButtonBase'
  }
);
