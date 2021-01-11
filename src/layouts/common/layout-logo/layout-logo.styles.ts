import { createUseStyles } from 'react-jss';
import { transitions } from 'polished';

import { Theme } from 'src/common';

export const useLayoutLogoStyles = createUseStyles(
  (theme: Theme) => ({
    logo: {
      color: theme.colors.primary,
      textDecoration: 'none',
      display: 'inline-flex',
      width: 40,
      ...transitions('opacity 0.3s ease'),

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 0.7
        }
      },

      [theme.breakpoints.lg()]: {
        height: 48,
        width: 48
      }
    },

    img: {
      maxWidth: '100%'
    }
  }),
  {
    name: 'LayoutLogo'
  }
);
