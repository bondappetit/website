import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinStyles = createUseStyles(
  (theme: Theme) => ({
    header: {
      marginBottom: 48,

      [theme.breakpoints.md()]: {
        marginBottom: 104
      }
    },

    section: {
      marginBottom: 160,

      [theme.breakpoints.md()]: {
        marginBottom: 200,

        '&:last-child': {
          marginBottom: 40
        }
      }
    }
  }),
  {
    name: 'Stablecoin'
  }
);
