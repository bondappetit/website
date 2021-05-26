import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinGraphStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridGap: 24,

      [theme.breakpoints.md()]: {
        gridGap: 40,
        gridTemplateColumns: '1fr 416px'
      }
    },

    inner: {
      padding: '32px 16px',

      [theme.breakpoints.md()]: {
        padding: '20px 36px'
      },

      [theme.breakpoints.lg()]: {
        padding: '40px 56px'
      }
    },

    title: {
      marginBottom: 32,
      fontSize: 14,
      lineHeight: '16px',

      [theme.breakpoints.md()]: {
        marginBottom: 22,
        fontSize: 16,
        lineHeight: '24px'
      }
    },

    chart: {
      position: 'relative',
      height: 160,
      maxWidth: 760,
      margin: '0 auto',
      marginBottom: 56,

      [theme.breakpoints.md()]: {
        height: 230,
        marginBottom: 52
      }
    },

    lines: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    },

    line: {
      position: 'relative',

      '&:before': {
        content: '""',
        position: 'absolute',
        left: 41,
        right: 0,
        height: 1,
        background: rgba(theme.colors.primary, 0.08),
        top: 0,
        bottom: 0,
        margin: 'auto'
      }
    },

    lineLegend: {
      color: rgba(theme.colors.primary, 0.24),
      position: 'absolute',
      transform: 'translate(0, -50%)',
      top: '50%',
      fontSize: 12,
      lineHeight: '16px',

      [theme.breakpoints.md()]: {
        fontSize: 14,
        lineHeight: '20px'
      }
    },

    bars: {
      position: 'absolute',
      bottom: 0,
      left: 68,
      right: 16,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gridGap: 20,

      [theme.breakpoints.lg()]: {
        gridGap: 30
      },

      [theme.breakpoints.up(1440)]: {
        gridGap: 52
      }
    },

    bar: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'end',
      position: 'relative',
      gridGap: 4,

      [theme.breakpoints.md()]: {
        gridGap: 8
      },

      '&:first-child': {
        '& $barUnfilled': {
          height: 35,

          [theme.breakpoints.md()]: {
            height: 46
          }
        },

        '& $barFilled': {
          height: 6,

          [theme.breakpoints.md()]: {
            height: 8
          }
        }
      },

      '&:nth-child(2)': {
        '& $barUnfilled': {
          height: 72,

          [theme.breakpoints.md()]: {
            height: 91
          }
        },

        '& $barFilled': {
          height: 19,

          [theme.breakpoints.md()]: {
            height: 24
          }
        }
      },

      '&:nth-child(3)': {
        '& $barUnfilled': {
          height: 110,

          [theme.breakpoints.md()]: {
            height: 139
          }
        },

        '& $barFilled': {
          height: 35,

          [theme.breakpoints.md()]: {
            height: 48
          }
        }
      },

      '&:nth-child(4)': {
        '& $barUnfilled': {
          height: 141,

          [theme.breakpoints.md()]: {
            height: 184
          }
        },

        '& $barFilled': {
          height: 60,

          [theme.breakpoints.md()]: {
            height: 80
          }
        }
      },

      '&:nth-child(5)': {
        '& $barUnfilled': {
          height: 160,

          [theme.breakpoints.md()]: {
            height: 230
          }
        },

        '& $barFilled': {
          height: 90,

          [theme.breakpoints.md()]: {
            height: 120
          }
        }
      }
    },

    barHalf: {
      borderRadius: 8,
      border: `1px solid ${theme.colors.primary}`
    },

    barUnfilled: {
      background: theme.colors.secondary
    },

    barFilled: {
      background: theme.colors.primary
    },

    year: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      opacity: 0.4,
      textAlign: 'center',
      width: '100%',
      fontSize: 12,
      lineHeight: '16px',

      [theme.breakpoints.md()]: {
        fontSize: 14,
        lineHeight: '20px'
      }
    },

    legend: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 197,
      margin: 'auto',

      [theme.breakpoints.lg()]: {
        width: 'auto',
        alignItems: 'center',
        flexDirection: 'row'
      }
    },

    legendItem: {
      display: 'grid',
      gridTemplateColumns: '24px 1fr',
      gridGap: 8,
      alignItems: 'center',

      '& $barHalf': {
        height: 8
      },

      [theme.breakpoints.lg()]: {
        '&:first-child': {
          marginRight: 32
        }
      }
    },

    tippy: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      padding: 16,
      borderRadius: 16
    }
  }),
  {
    name: 'StablecoinGraph'
  }
);
