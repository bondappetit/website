import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralDescriptionStyles = createUseStyles(
  (theme: Theme) => ({
    backLink: {
      marginBottom: 24
    },

    title: {
      marginBottom: 8,

      [theme.breakpoints.lg()]: {
        fontSize: 64,
        lineHeight: '72px'
      }
    },

    subtitle: {
      marginBottom: 32
    },

    status: {
      marginRight: 12
    },

    description: {
      marginBottom: 64
    }
  }),
  {
    name: 'CollateralDescription'
  }
);
