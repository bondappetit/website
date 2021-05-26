import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinFeaturesStyles = createUseStyles(
  (theme: Theme) => ({
    decision: {
      display: 'grid',
      padding: '32px 16px',
      gridGap: 48,

      [theme.breakpoints.lg()]: {
        gridGap: 130,
        padding: '64px 80px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
      }
    },

    decisionCard: {
      border: 'none'
    },

    decisionCardList: {
      margin: 0,
      listStyleType: 'none',
      padding: 0
    },

    decisionCardListItem: {
      display: 'flex',

      '&:before': {
        content: '"- "',
        marginRight: 8,

        [theme.breakpoints.lg()]: {
          marginRight: 4,
          marginLeft: -12
        }
      }
    },

    decisionCardText: {
      marginBottom: 8,

      [theme.breakpoints.down(1279)]: {
        marginBottom: 4,
        fontSize: 14,
        lineHeight: '20px'
      }
    },

    icon: {
      marginBottom: 16,
      width: 100,
      height: 60,

      [theme.breakpoints.md()]: {
        width: 200,
        height: 120
      }
    }
  }),
  {
    name: 'StablecoinFeatures'
  }
);
