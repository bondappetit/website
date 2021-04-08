import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useInputStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      fontSize: 20,
      lineHeight: '24px',
      height: 24,

      [theme.breakpoints.md()]: {
        fontSize: 40,
        lineHeight: '48px',
        height: 48
      }
    },

    error: {
      color: theme.colors.error
    },

    input: {
      display: 'inherit',
      backgroundColor: 'transparent',
      border: 0,
      outline: 0,
      fontFamily: 'inherit',
      color: 'inherit',
      padding: 0,
      letterSpacing: '-0.02em',
      width: '100%',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      textAlign: 'inherit',
      height: 'inherit',

      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },

      '&::placeholder': {
        color: 'inherit',
        opacity: 0.4
      },

      '&::-ms-input-placeholder': {
        color: 'inherit',
        opacity: 0.4
      },

      [theme.mixins.hover()]: {
        '&:focus': {
          color: 'inherit'
        }
      }
    },

    normal: {},

    disabled: {
      pointerEvents: 'none',
      opacity: 0.6
    },

    readOnly: {
      pointerEvents: 'none'
    },

    labelWrap: {
      width: '100%',
      display: 'inherit',
      flexDirection: 'column'
    },

    label: {
      letterSpacing: '-0.02em',
      width: '100%',
      pointerEvents: 'none',
      height: 'inherit',
      fontSize: 16,
      lineHeight: '24px'
    },

    small: {
      height: 24,
      fontSize: 16,
      lineHeight: '24px'
    }
  }),
  {
    name: 'Input'
  }
);
