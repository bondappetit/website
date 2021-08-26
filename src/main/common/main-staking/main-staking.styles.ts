import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStakingStyles = createUseStyles(
  (theme: Theme) => ({
    stakingList: {
      gridGap: 24,
      marginBottom: 40,

      [theme.breakpoints.md()]: {
        marginBottom: 48,
        display: 'grid',
        gridGap: 40,
        gridTemplateColumns: 'repeat(auto-fit, minmax(416px, 1fr))'
      }
    },

    header: {
      maxWidth: 872,
      marginBottom: 48
    },

    link: {
      opacity: 0.4
    }
  }),
  {
    name: 'MainStaking'
  }
);
