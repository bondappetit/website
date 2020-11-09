import { createUseStyles } from 'react-jss';
import { transitions } from 'polished';

import { Theme } from 'src/common';

export const useLayoutLogoStyles = createUseStyles((theme: Theme) => ({
  logo: {
    height: 81,
    width: 125,
    color: theme.colors.primary,
    textDecoration: 'none',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...transitions('opacity 0.3s ease'),

    [theme.mixins.hover()]: {
      '&:hover': {
        opacity: 0.7
      }
    }
  }
}));
