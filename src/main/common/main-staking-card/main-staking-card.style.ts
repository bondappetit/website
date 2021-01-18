import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStakingCardStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 24,
      padding: 40,
      minHeight: 320,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      [theme.breakpoints.md()]: {
        minHeight: 480
      }
    },

    head: {
      marginBottom: 48
    }
  }),
  {
    name: 'MainStakingCard'
  }
);
