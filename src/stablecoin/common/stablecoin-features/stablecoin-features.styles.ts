import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinFeaturesStyles = createUseStyles(
  (theme: Theme) => ({
    feature: {
      display: 'grid',
      gridGap: 20,

      [theme.breakpoints.lg()]: {
        gridGap: 40,
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
      }
    },

    featureCard: {
      padding: '32px 16px',

      [theme.breakpoints.lg()]: {
        padding: '56px 56px 112px'
      }
    },

    featureCardText: {
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
