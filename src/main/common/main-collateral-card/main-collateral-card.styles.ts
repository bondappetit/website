import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainCollateralCardStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      [theme.breakpoints.lg()]: {
        height: 349,
        borderRadius: '50%',
        maxWidth: 432,
        border: `1px solid ${theme.colors.primary}`
      },

      [theme.breakpoints.up(1385)]: {
        height: 400
      },

      [theme.breakpoints.up(1500)]: {
        height: 432
      }
    },

    content: {
      maxWidth: 288,
      textAlign: 'center',
      fontSize: 14,
      lineHeight: '20px',

      [theme.breakpoints.lg()]: {
        fontSize: 20,
        lineHeight: '28px'
      }
    }
  }),
  {
    name: 'MainCollateralCard'
  }
);
