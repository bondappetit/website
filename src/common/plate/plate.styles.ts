import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const usePlateStyles = createUseStyles(
  (theme: Theme) => ({
    plate: {
      borderRadius: 24,
      backgroundColor: theme.colors.secondary,
      border: `1px solid ${theme.colors.primary}`
    }
  }),
  {
    name: 'Plate'
  }
);
