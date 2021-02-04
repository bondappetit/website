import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingChartStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      border: `1px solid ${theme.colors.primary}`,
      height: 24,
      borderRadius: 4
    },

    fillSegment: {
      width: '65%',
      color: theme.colors.primary,
      backgroundColor: 'currentColor',
      position: 'relative',
      zIndex: 0,
      borderRadius: 4
    },

    segment: {
      borderRadius: 4,

      '&:not(:last-child)': {
        borderRight: '1px solid currentColor'
      }
    },

    segment20: {
      width: '20%'
    },

    segment14: {
      width: '14%'
    },

    segment1: {
      width: '1%'
    }
  }),
  {
    name: 'VotingChart'
  }
);
