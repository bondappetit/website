import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const usePieIconStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      transform: 'rotate(-90deg)',
      background: theme.colors.secondary,
      borderRadius: '50%',
      border: `1px solid ${theme.colors.primary}`
    },

    circle: {
      fill: theme.colors.secondary,
      stroke: theme.colors.primary
    }
  }),
  {
    name: 'PieIcon'
  }
);
