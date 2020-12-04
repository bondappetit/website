import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useInputStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      marginTop: 17
    },

    input: {
      display: 'inherit',
      backgroundColor: 'transparent',
      border: 0,
      outline: 0,
      fontFamily: 'inherit',
      color: theme.colors.primary,
      padding: 0,
      letterSpacing: '-0.02em',
      width: '100%',
      textOverflow: 'inherit',
      fontSize: 20,
      lineHeight: '24px',
      height: 24,

      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },

      [theme.breakpoints.md()]: {
        fontSize: 40,
        lineHeight: '48px',
        height: 48
      }
    },

    normal: {},

    small: {
      height: 24,
      fontSize: 16,
      lineHeight: '24px'
    },

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
      textOverflow: 'inherit'
    },

    label: {
      position: 'absolute',
      letterSpacing: '-0.02em',
      width: '100%',
      pointerEvents: 'none',
      height: 'inherit',
      transition: 'transform 300ms ease',
      transform: 'translateY(-17px) scale(0.55)',
      transformOrigin: 'top left',
      fontSize: 20,
      lineHeight: '24px',

      [theme.breakpoints.md()]: {
        fontSize: 40,
        lineHeight: '48px',
        transform: 'translateY(-17px) scale(0.35)'
      }
    },

    error: {
      color: theme.colors.error
    }
  }),
  {
    name: 'Input'
  }
);
