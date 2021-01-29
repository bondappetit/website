import { createUseStyles } from 'react-jss';
import { lighten, invert } from 'polished';

import { Theme } from 'src/common';

export const useStakingHeaderStyles = createUseStyles(
  (theme: Theme) => {
    const bgColors: Record<string, string> = {
      BAG: theme.colors.yellow,
      USDp: theme.colors.pink,
      BAG_USDC: theme.colors.chetwodeBlue,
      USDp_USDC: theme.colors.darkGreen,
      USDp_USDN: lighten(0.4, invert(theme.colors.purple))
    };

    return {
      root: {
        backgroundColor: (props: { tokenName: string }) =>
          bgColors[props.tokenName],
        backgroundRepeat: 'no-repeat',
        backgroundSize: '884px',
        border: `1px solid ${theme.colors.primary}`,
        backgroundPosition: 'center 40%',
        borderRadius: 24,
        padding: [72, 56],
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',

        [theme.breakpoints.md()]: {
          padding: 48,
          minHeight: 240
        }
      },

      link: {
        fontSize: 40,
        lineHeight: '20px',
        display: 'none',

        [theme.breakpoints.md()]: {
          display: 'inline',
          position: 'absolute',
          top: 16,
          left: 20
        }
      },

      linkIcon: {
        width: 24,
        height: 17
      },

      title: {
        marginBottom: 40,

        [theme.breakpoints.md()]: {
          marginBottom: 24
        },

        '& > *': {
          fontSize: 24,
          lineHeight: '32px',

          [theme.breakpoints.md()]: {
            fontSize: 40,
            lineHeight: '48px'
          }
        }
      },

      content: {
        margin: 'auto',

        [theme.breakpoints.md()]: {
          margin: 0
        }
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
    name: 'StakingHeader'
  }
);
