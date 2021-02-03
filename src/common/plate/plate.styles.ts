import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const usePlateStyles = createUseStyles(
  (theme: Theme) => ({
    plate: {
      borderRadius: 24,
      border: `1px solid ${theme.colors.primary}`
    },

    grey: {
      backgroundColor: theme.colors.proposalPlate
    },

    transparent: {
      backgroundColor: theme.colors.secondary
    },

    withoutBorder: {
      borderColor: 'transparent'
    }
  }),
  {
    name: 'Plate'
  }
);
