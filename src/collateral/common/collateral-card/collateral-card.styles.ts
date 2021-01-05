import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useCollateralCardStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      minHeight: 300,
      padding: 40,
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        minHeight: 480
      }
    },

    body: {
      margin: 'auto'
    }
  }),
  {
    name: 'CollateralCard'
  }
);
