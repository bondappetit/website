import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useInvestingStatisticStyles = createUseStyles(
  (theme: Theme) => ({
    row: {
      marginTop: 64,
      display: 'grid',
      gridGap: 48,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr'
      }
    },

    rightCard: {
      maxWidth: 396
    },

    title: {
      maxWidth: 1200,
      margin: '0 auto'
    },

    count: {
      fontSize: 64,
      lineHeight: '72px',

      [theme.breakpoints.sm()]: {
        fontSize: 70,
        lineHeight: '72px'
      },

      [theme.breakpoints.md()]: {
        fontSize: 80,
        lineHeight: '82px'
      },

      [theme.breakpoints.lg()]: {
        fontSize: 104,
        lineHeight: '112px'
      }
    },

    card: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: 320,
      padding: 16,

      [theme.breakpoints.md()]: {
        padding: 48,
        height: 560
      }
    },

    cardSubtitle: {
      maxWidth: 536,
      margin: '0 auto'
    }
  }),
  {
    name: 'InvestingStatistic'
  }
);
