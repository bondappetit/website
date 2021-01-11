import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinDecentralizedStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      marginBottom: 8
    },

    text: {
      maxWidth: 960,
      margin: '0 auto 64px auto'
    },

    list: {
      display: 'grid',
      gridGap: 40,

      [theme.breakpoints.sm()]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      },

      [theme.breakpoints.md()]: {
        gridGap: 48
      }
    },

    card: {
      display: 'flex',
      flexDirection: 'column',
      border: 'none',

      [theme.breakpoints.lg()]: {
        minHeight: 480,
        padding: '64px 116px 48px 116px',
        border: `2px dotted ${theme.colors.primary}`
      }
    },

    cardTitle: {
      [theme.breakpoints.lg()]: {
        marginBottom: 24
      }
    },

    link: {
      marginTop: 'auto'
    }
  }),
  {
    name: 'StablecoinDecentralized'
  }
);
