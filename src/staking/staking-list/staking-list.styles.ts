import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingListStyles = createUseStyles(
  (theme: Theme) => ({
    header: {
      marginBottom: 104
    },

    title: {
      maxWidth: 1200,
      margin: '0 auto 40px'
    },

    info: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        flexDirection: 'row'
      }
    },

    bag: {
      [theme.breakpoints.md()]: {
        marginRight: 32
      }
    },

    staking: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 48,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    skeleton: {
      minHeight: 360
    }
  }),
  {
    name: 'StakingList'
  }
);
