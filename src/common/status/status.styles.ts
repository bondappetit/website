import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStatusStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      margin: 0,
      minWidth: 0,
      fontWeight: 400,
      borderRadius: 8,
      padding: '0 8px',
      border: '1px solid currentColor',
      display: 'inline-block'
    },

    grey: {
      color: theme.colors.grey
    },

    blue: {
      color: theme.colors.blue
    },

    red: {
      color: theme.colors.red
    },

    orange: {
      color: theme.colors.orange
    },

    beige: {
      color: theme.colors.beige
    },

    green: {
      color: theme.colors.green
    },

    pink: {
      color: theme.colors.pink
    },

    purple: {
      color: theme.colors.purple
    },

    black: {
      color: theme.colors.primary
    },

    contained: {
      '&$grey': {
        backgroundColor: theme.colors.grey,
        color: theme.colors.primary,
        borderColor: theme.colors.grey
      },

      '&$blue': {
        backgroundColor: theme.colors.blue,
        color: theme.colors.primary,
        borderColor: theme.colors.blue
      },

      '&$red': {
        backgroundColor: theme.colors.red,
        color: theme.colors.primary,
        borderColor: theme.colors.red
      },

      '&$orange': {
        backgroundColor: theme.colors.orange,
        color: theme.colors.primary,
        borderColor: theme.colors.orange
      },

      '&$beige': {
        backgroundColor: theme.colors.beige,
        color: theme.colors.primary,
        borderColor: theme.colors.beige
      },

      '&$green': {
        backgroundColor: theme.colors.green,
        color: theme.colors.primary,
        borderColor: theme.colors.green
      },

      '&$pink': {
        backgroundColor: theme.colors.pink,
        color: theme.colors.primary,
        borderColor: theme.colors.pink
      },

      '&$black': {
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
        borderColor: theme.colors.primary
      }
    },

    outlined: {}
  }),
  {
    name: 'Status'
  }
);
