import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const usePlateStyles = createUseStyles(
  (theme: Theme) => ({
    plate: {
      borderRadius: 24,
      backgroundColor: theme.colors.secondary
    },

    dashed: {
      border: `2px dashed ${theme.colors.primary}`
    },

    dotted: {
      border: `2px dotted ${theme.colors.primary}`
    }
  }),
  {
    name: 'Plate'
  }
);
