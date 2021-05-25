import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainEditorStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.md()]: {
        display: 'flex'
      }
    },

    title: {
      marginBottom: 48,
      maxWidth: 872
    },

    window: {
      marginBottom: 20,

      [theme.breakpoints.md()]: {
        width: 'calc(50% + 20px)',
        position: 'relative',
        right: -20,
        bottom: -48,
        marginBottom: 0
      }
    },

    wrap: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: 327,
      margin: 'auto',

      [theme.breakpoints.md()]: {
        maxWidth: 488
      }
    },

    numbers: {
      opacity: 0.24,
      marginRight: 16,

      [theme.breakpoints.md()]: {
        marginRight: 24
      }
    },

    text: {
      marginLeft: 15,

      [theme.breakpoints.up(369)]: {
        marginLeft: 40
      }
    },

    space: {
      display: 'none',

      [theme.breakpoints.up(405)]: {
        display: 'block'
      }
    }
  }),
  {
    name: 'MainEditor'
  }
);
