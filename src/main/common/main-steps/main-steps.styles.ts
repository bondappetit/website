import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainStepsStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      maxWidth: 872,
      margin: '0 0 48px',
      padding: '0 16px',

      [theme.breakpoints.md()]: {
        margin: '0 0 70px',
        padding: 0
      }
    },

    content: {
      margin: '0 -16px',

      [theme.breakpoints.md()]: {
        margin: '0 -64px'
      }
    },

    status: {
      borderRadius: 8,
      padding: '2px 8px',

      [theme.breakpoints.md()]: {
        display: 'none'
      }
    },

    segment: {
      height: 1,
      width: '100%',
      display: 'none',
      backgroundColor: theme.colors.primary,
      marginBottom: 45,

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    },

    list: {
      display: 'grid',
      gridGap: 48,
      padding: '0 16px',

      [theme.breakpoints.md()]: {
        margin: '0 auto',
        gridGap: 50,
        gridTemplateColumns: 'repeat(auto-fit, minmax(228px, 1fr))',
        padding: '0 64px'
      },

      [theme.breakpoints.lg()]: {
        gridGap: 128
      }
    },

    card: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',

      '&:before': {
        position: 'absolute',
        width: 32,
        height: 32,
        border: '1px solid currentColor',
        top: -62,
        left: 0,
        borderRadius: '100%',
        backgroundColor: theme.colors.secondary,

        [theme.breakpoints.md()]: {
          content: '""'
        }
      },

      [theme.breakpoints.md()]: {
        minHeight: 208
      }
    },

    cardActive: {
      '&:before': {
        backgroundColor: theme.colors.primary
      }
    },

    cardBody: {
      [theme.breakpoints.md()]: {
        marginBottom: '16px'
      }
    },

    mobileCardDate: {
      opacity: 0.4
    }
  }),
  {
    name: 'MainSteps'
  }
);
