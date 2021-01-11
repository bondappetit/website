import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinStyles = createUseStyles(
  (theme: Theme) => ({
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
