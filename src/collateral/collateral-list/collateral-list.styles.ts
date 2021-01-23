import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useCollateralListStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    title: {
      maxWidth: 1200,
      margin: '0 auto 64px'
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

    ussued: {
      marginBottom: 104,

      [theme.breakpoints.md()]: {
        marginBottom: 128
      }
    },

    assets: {},

    assetsTitle: {
      maxWidth: 800,
      margin: '0 auto 104px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 128px'
      }
    },

    borrowText: {
      marginBottom: 16
    }
  }),
  {
    name: 'CollateralList'
  }
);
