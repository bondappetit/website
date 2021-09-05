import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useCollateralListStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    title: {
      marginBottom: 24
    },

    subtitle: {
      marginBottom: 80
    },

    phaseDescription: {
      marginBottom: 20
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

    ussued: {
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        marginBottom: 48
      }
    },

    overflow: {
      overflowX: 'hidden',
      overflowY: 'scroll'
    },

    checkModal: {
      height: '100%',
      maxHeight: 850
    }
  }),
  {
    name: 'CollateralList'
  }
);
