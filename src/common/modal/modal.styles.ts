import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useModalStyles = createUseStyles((theme: Theme) => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.secondary,
    color: theme.colors.primary,
    zIndex: 999999,
    overflow: 'hidden'
  },

  header: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',

    [theme.breakpoints.md()]: {
      padding: '12px 32px'
    }
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',

    [theme.breakpoints.md()]: {
      height: 'calc(100vh - 88px)'
    }
  }
}));
