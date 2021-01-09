import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingHeaderStyles = createUseStyles(
  (theme: Theme) => {
    const bgColors: Record<string, string> = {
      Governance: theme.colors.yellow,
      Stable: theme.colors.pink,
      Stable_USDC_LP: theme.colors.chetwodeBlue,
      Governance_USDC_LP: theme.colors.darkGreen
    };

    return {
      root: {
        backgroundColor: (props: { tokenName: string }) =>
          bgColors[props.tokenName],
        backgroundRepeat: 'no-repeat',
        backgroundSize: '884px',
        border: `1px solid ${theme.colors.primary}`,
        backgroundPosition: 'center 40%',
        minHeight: 320,
        borderRadius: 24,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',

        [theme.breakpoints.md()]: {
          minHeight: 240
        }
      },

      link: {
        fontSize: 40,
        lineHeight: '20px',
        display: 'none',

        [theme.breakpoints.md()]: {
          display: 'inline'
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
    name: 'StackingHeader'
  }
);
