import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useCollateralCardStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: 40,
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        minHeight: 268
      }
    },

    title: {
      fontSize: 14,
      lineHeight: '20px',
      marginBottom: 8,

      [theme.breakpoints.md()]: {
        fontSize: 20,
        lineHeight: '28px',
        marginBottom: 0
      }
    },

    body: {
      margin: 'auto'
    },

    bodyText: {
      fontSize: 24,
      lineHeight: '32px',
      marginBottom: 8,

      [theme.breakpoints.md()]: {
        fontSize: 40,
        lineHeight: '48px',
        marginBottom: 0
      }
    },

    subtitle: {
      fontSize: 14,
      lineHeight: '20px',

      [theme.breakpoints.md()]: {
        fontSize: 20,
        lineHeight: '28px'
      }
    }
  }),
  {
    name: 'CollateralCard'
  }
);
