import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingCardStyles = createUseStyles(
  (theme: Theme) => {
    const bgColors: Record<string, string> = {
      Governance: theme.colors.beige,
      Stable: theme.colors.yellow,
      ART_USDC_LP: theme.colors.darkBlue,
      Bond_USDC_LP: theme.colors.darkGreen
    };

    return {
      stakingCard: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage: (props: { img: string }) => `url(${props.img})`,
        backgroundColor: (props: { tokenName: string }) =>
          bgColors[props.tokenName],
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 24,
        minHeight: 360,

        [theme.mixins.hover()]: {
          '&:hover': {
            opacity: 1
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
    name: 'StackingCard'
  }
);
