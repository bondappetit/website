import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useMainStakingStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      maxWidth: 1200,
      margin: '0 auto 104px auto'
    },

    subtitle: {
      maxWidth: 790,
      margin: '0 auto 48px auto'
    },

    stakingList: {
      gridGap: 24,
      marginBottom: 40,

      [theme.breakpoints.md()]: {
        marginBottom: 48,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
      },

      [theme.breakpoints.up(1400)]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }
    },

    skeleton: {
      minHeight: 360
    }
  }),
  {
    name: 'MainStaking'
  }
);
