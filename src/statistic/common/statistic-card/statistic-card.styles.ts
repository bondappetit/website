import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStatisticCardStyles = createUseStyles(
  (theme: Theme) => ({
    card: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: 320,
      padding: 16,

      [theme.breakpoints.md()]: {
        padding: 48,
        height: 560
      }
    }
  }),
  {
    name: 'StatisticCard'
  }
);
