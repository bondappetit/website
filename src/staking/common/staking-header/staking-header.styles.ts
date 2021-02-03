import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingHeaderStyles = createUseStyles(
  (theme: Theme) => {
    return {
      root: {
        backgroundColor: theme.colors.proposalPlate,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '884px',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        [theme.breakpoints.lg()]: {
          justifyContent: 'center',
          flexDirection: 'row',

          '& > *:not(:last-child)': {
            marginRight: 32
          }
        }
      }
    };
  },
  {
    name: 'StakingHeader'
  }
);
