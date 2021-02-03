import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainEditorStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      border: `1px solid ${theme.colors.primary}`,
      height: 456,
      padding: 12,
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        minHeight: 600,
        padding: 24,
        borderRadius: 24
      }
    },

    actions: {
      display: 'flex'
    },

    actionsItem: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: `1px solid ${theme.colors.primary}`,
      '&:not(:last-child)': {
        marginRight: 8
      },

      [theme.breakpoints.md()]: {
        width: 24,
        height: 24,

        '&:not(:last-child)': {
          marginRight: 16
        }
      }
    },

    wrap: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: 327,
      margin: 'auto 0',

      [theme.breakpoints.up(369)]: {
        margin: 'auto 12px'
      },

      [theme.breakpoints.up(405)]: {
        margin: 'auto'
      },

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
