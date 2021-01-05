import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useCollateralListStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    title: {
      marginBottom: 64
    },

    list: {
      display: 'grid',
      gridGap: 48,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 48px 1fr',
        alignItems: 'center',
        gridGap: 0
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

    separator: {
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    },

    assets: {},

    assetsTitle: {
      marginBottom: 48
    },

    borrowText: {
      marginBottom: 16
    },

    borrowTitle: {
      [theme.breakpoints.lg()]: {
        fontSize: 64,
        lineHeight: '72px'
      }
    }
  }),
  {
    name: 'Collateral'
  }
);
