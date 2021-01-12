import { createUseStyles } from 'react-jss';
import { transitions } from 'polished';

import { Theme } from 'src/common';

export const useStakingCardStyles = createUseStyles(
  (theme: Theme) => {
    const bgColors: Record<string, string> = {
      Governance: theme.colors.yellow,
      Stable: theme.colors.pink,
      ART_USDC_LP: theme.colors.chetwodeBlue,
      Bond_USDC_LP: theme.colors.darkGreen
    };

    return {
      stakingCard: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 24,
        minHeight: 360,
        border: `1px solid ${theme.colors.primary}`,
        ...transitions('background-color .3s ease-in-out'),

        [theme.mixins.hover()]: {
          '&:hover': {
            opacity: 1,
            backgroundColor: (props: { tokenName: string }) =>
              bgColors[props.tokenName]
          }
        }
      },

      apy: {
        marginBottom: 16
      },

      deposit: {
        marginBottom: 4
      }
    };
  },
  {
    name: 'StakingCard'
  }
);
