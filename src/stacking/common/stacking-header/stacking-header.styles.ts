import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingHeaderStyles = createUseStyles(
  (theme: Theme) => {
    const bgColors: Record<string, string> = {
      Governance: theme.colors.beige,
      Stable: theme.colors.yellow,
      ART_USDC_LP: theme.colors.darkBlue,
      Bond_USDC_LP: theme.colors.darkGreen
    };

    return {
      root: {
        backgroundImage: (props: { img: string }) => `url(${props.img})`,
        backgroundColor: (props: { tokenName: string }) =>
          bgColors[props.tokenName],
        backgroundRepeat: 'no-repeat',
        backgroundSize: '884px',
        backgroundPosition: 'center 40%',
        minHeight: 240,
        borderRadius: 24,
        padding: 20
      },

      link: {
        fontSize: 40,
        lineHeight: '48px'
      },

      linkIcon: {
        width: 24,
        height: 17
      },

      title: {
        marginBottom: 24
      },

      info: {
        textAlign: 'center',

        '& > *:not(:last-child)': {
          marginRight: 32
        }
      }
    };
  },
  {
    name: 'StackingHeader'
  }
);
