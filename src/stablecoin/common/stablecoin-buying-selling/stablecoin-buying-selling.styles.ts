import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinBuyingSellingStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 24px 48px',
      minHeight: 320,
      gridRowStart: 1,

      [theme.breakpoints.md()]: {
        padding: '40px 63px 64px',
        minHeight: 400,
        gridRowStart: 'unset'
      }
    },

    info: {
      marginBottom: 72,

      '& *:first-child': {
        marginBottom: 8
      }
    },

    actions: {
      width: '100%',
      margin: 'auto auto 0',
      display: 'flex',
      flexDirection: 'column',

      '& button:first-child': {
        marginBottom: 16
      },

      [theme.breakpoints.md()]: {
        maxWidth: 240
      }
    }
  }),
  {
    name: 'StablecoinBuyingSelling'
  }
);
