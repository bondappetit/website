import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useInfoCardWrapperStyles = createUseStyles((theme: Theme) => ({
  wrap: {
    maxWidth: 756,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'calc(100vh - 96px)',
    marginBottom: 32,
    padding: '0 16px',

    [theme.breakpoints.md()]: {
      height: 'auto',
      alignItems: 'center',
      marginBottom: 0
    }
  },

  title: {
    marginTop: 'auto',
    marginBottom: 'auto',

    [theme.breakpoints.md()]: {
      marginBottom: 32
    }
  },

  typography: {
    fontSize: 32,
    lineHeight: '40px',

    [theme.breakpoints.md()]: {
      fontSize: 38,
      lineHeight: '46px'
    },

    [theme.breakpoints.lg()]: {
      fontSize: 48,
      lineHeight: '56px'
    }
  },

  decoratedText: {
    position: 'relative',
    zIndex: 1,
    whiteSpace: 'nowrap'
  }
}));
