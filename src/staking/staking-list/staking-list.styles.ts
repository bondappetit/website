import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingListStyles = createUseStyles(
  (theme: Theme) => ({
    header: {
      marginBottom: 24,

      [theme.breakpoints.lg()]: {
        marginBottom: 48
      }
    },

    titleWrap: {
      maxWidth: 872,
      marginBottom: 40
    },

    title: {
      marginBottom: 24
    },

    staking: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 40,
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(416px, 1fr))'
      },

      [theme.breakpoints.lg()]: {
        gridGap: 48,
        marginBottom: 48
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
