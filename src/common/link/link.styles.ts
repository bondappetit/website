import { createUseStyles } from 'react-jss';
import { transitions } from 'polished';

import { Theme } from '../theme';

export const useLinkStyles = createUseStyles(
  (theme: Theme) => ({
    link: {
      display: 'inline-flex',
      cursor: 'pointer',
      outline: 0,
      fontFamily: 'inherit',
      letterSpacing: '-0.02em',
      fontWeight: 'normal',
      ...transitions('opacity 0.3s ease'),

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 0.7
        }
      }
    },

    none: {
      textDecoration: 'none'
    },

    always: {
      textDecoration: 'underline'
    },

    hover: {
      textDecoration: 'none',

      [theme.mixins.hover()]: {
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    },

    primary: {
      color: 'currentColor'
    },

    blue: {
      color: theme.colors.darkBlue
    }
  }),
  {
    name: 'Link'
  }
);
