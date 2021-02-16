import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useSubscribeNewsFloatStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      width: 448,
      height: 268,
      padding: 24,
      borderRadius: 16,

      '& $button': {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.primary,
        borderColor: theme.colors.secondary
      }
    },

    success: {
      backgroundColor: theme.colors.superGreen,

      '& $button': {
        color: theme.colors.superGreen
      }
    },

    successTitle: {
      marginBottom: 73
    },

    form: {
      display: 'flex',
      flexDirection: 'column'
    },

    title: {
      marginBottom: 10
    },

    input: {
      marginBottom: 25,
      color: theme.colors.secondary
    },

    button: {},

    closeButton: {
      position: 'absolute',
      top: 15,
      right: 15,
      opacity: 0.4
    }
  }),
  {
    name: 'SubscribeNewsFloat'
  }
);
