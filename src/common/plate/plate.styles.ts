import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const usePlateStyles = createUseStyles(
  (theme: Theme) => ({
    plate: {
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 16,

      [theme.breakpoints.md()]: {
        borderRadius: 24
      }
    },

    grey: {
      backgroundColor: theme.colors.proposalPlate,
      '--plate': theme.colors.proposalPlate
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
