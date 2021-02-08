import { createUseStyles } from 'react-jss';
import { transitions, lighten, invert } from 'polished';

import { Theme } from 'src/common';

export const useStakingCardStyles = createUseStyles(
  (theme: Theme) => {
    const bgColors: Record<string, string> = {
      BAG: theme.colors.yellow,
      USDp: theme.colors.pink,
      BAG_USDC: theme.colors.chetwodeBlue,
      USDp_USDC: theme.colors.darkGreen,
      USDp_USDN: lighten(0.4, invert(theme.colors.purple))
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
        minHeight: 400,
        position: 'relative',
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

      title: {
        display: 'flex',
        fontSize: 24,
        lineHeight: '32px',

        [theme.breakpoints.md()]: {
          fontSize: 32,
          lineHeight: '40px'
        }
      },

      apy: {
        marginBottom: 30,
        fontSize: 24,
        lineHeight: '32px',

        [theme.breakpoints.md()]: {
          fontSize: 32,
          lineHeight: '40px'
        }
      },

      deposit: {
        marginBottom: 4
      },

      stacked: {
        position: 'absolute',
        top: 16,
        left: 16
      },

      icon: {
        width: 28,
        height: 28,
        marginRight: 4,

        [theme.breakpoints.md()]: {
          width: 32,
          height: 32
        }
      },

      plus: {
        margin: '0 8px'
      }
    };
  },
  {
    name: 'StakingCard'
  }
);
