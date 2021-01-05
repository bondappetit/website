import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralDetailStyles = createUseStyles(
  (theme: Theme) => ({
    list: {
      display: 'grid',
      gridGap: 48,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    section: {
      marginBottom: 100,

      [theme.breakpoints.md()]: {
        marginBottom: 200,

        '&:last-child': {
          marginBottom: 40
        }
      }
    },

    sectionTitle: {
      marginBottom: 48
    }
  }),
  {
    name: 'CollateralDetail'
  }
);
