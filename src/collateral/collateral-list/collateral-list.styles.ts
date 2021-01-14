import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useCollateralListStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    title: {
      marginBottom: 64,

      [theme.breakpoints.md()]: {
        fontSize: 64,
        lineHeight: '72px'
      }
    },

    list: {
      display: 'grid',

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 104px 1fr',
        alignItems: 'center',
        gridGap: 0
      }
    },

    card: {
      border: 'none'
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

    assets: {},

    assetsTitle: {
      marginBottom: 104,

      [theme.breakpoints.md()]: {
        marginBottom: 128
      }
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
