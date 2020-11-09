import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useSelectStyles = createUseStyles((theme: Theme) => ({
  wrap: {
    marginTop: 17,
    fontSize: 20,
    lineHeight: '24px',
    position: 'relative',
    zIndex: 1,
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
    top: '100%'
  },

  label: {
    position: 'absolute',
    letterSpacing: '-0.02em',
    textOverflow: 'inherit',
    overflow: 'hidden',
    width: '100%',
    pointerEvents: 'none',
    height: 'inherit',
    transition: 'transform 300ms ease',
    transform: 'translateY(0) scale(1)',
    transformOrigin: 'top left',
    fontSize: 20,
    lineHeight: '24px',
    zIndex: 2,
    paddingRight: 8,

    [theme.breakpoints.md()]: {
      fontSize: 40,
      lineHeight: '48px',
      paddingRight: 16
    }
  },

  focus: {
    textOverflow: 'initial',
    overflow: 'visible',
    transform: 'translateY(-17px) scale(0.55)',

    [theme.breakpoints.md()]: {
      transform: 'translateY(-17px) scale(0.35)'
    }
  },

  option: {
    color: theme.colors.primary,
    width: '100%',
    justifyContent: 'flex-start'
  },

  icon: {
    width: 8,
    height: 8,
    marginLeft: 'auto',

    [theme.breakpoints.md()]: {
      width: 16,
      height: 16
    }
  },

  open: {
    transform: 'rotate(180deg)'
  }
}));
