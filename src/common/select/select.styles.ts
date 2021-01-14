import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useSelectStyles = createUseStyles(
  (theme: Theme) => ({
    wrap: {
      marginTop: 17,
      fontSize: 20,
      lineHeight: '24px',
      position: 'relative',
      height: 24,
      textOverflow: 'ellipsis',

      [theme.breakpoints.md()]: {
        height: 48,
        fontSize: 40,
        lineHeight: '48px'
      }
    },

    select: {
      position: 'relative',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
      height: 'inherit',
      width: '100%',
      color: theme.colors.primary,
      letterSpacing: '-0.02em',
      outline: 'none',
      cursor: 'pointer'
    },

    disabled: {
      pointerEvents: 'none',
      opacity: 0.6
    },

    readOnly: {
      pointerEvents: 'none'
    },

    dropdown: {
      position: 'absolute',
      background: theme.colors.secondary,
      width: '100%',
      left: 0,
      zIndex: 10,
      top: '100%',
      overflowY: 'scroll',
      maxHeight: 300,
      display: 'none'
    },

    dropdownOpen: {
      display: 'block'
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
      zIndex: 2,
      paddingRight: 8,

      [theme.breakpoints.md()]: {
        fontSize: 40,
        lineHeight: '48px',
        paddingRight: 16,
        transform: 'translateY(-17px) scale(0.35)'
      }
    },

    option: {
      color: theme.colors.primary,
      width: '100%',
      justifyContent: 'flex-start'
    },

    open: {
      transform: 'rotate(180deg) translateY(5px)'
    }
  }),
  {
    name: 'Select'
  }
);
