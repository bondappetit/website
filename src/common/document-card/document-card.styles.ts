import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useDocumentCardStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
      zIndex: 1
    },

    card: {
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 16,
      height: 240,
      padding: 16,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: theme.colors.secondary,
      color: 'inherit',
      textDecoration: 'none',

      [theme.breakpoints.md()]: {
        border: `2px solid ${theme.colors.primary}`,
        padding: 48,
        height: 440
      },

      '&:after, &:before': {
        content: '" "',
        position: 'absolute',
        left: -1,
        bottom: 0,
        border: 'inherit',
        borderRadius: 'inherit',
        backgroundColor: 'inherit',

        [theme.breakpoints.md()]: {
          left: -2
        }
      },

      '&:before': {
        right: 32,
        zIndex: -2,
        top: -20,

        [theme.breakpoints.md()]: {
          right: 48,
          top: -24
        }
      },

      '&:after': {
        right: 16,
        zIndex: -1,
        top: -10,

        [theme.breakpoints.md()]: {
          right: 24,
          top: -12
        }
      }
    },

    download: {
      position: 'absolute',
      right: 16,
      bottom: 16,

      [theme.breakpoints.md()]: {
        right: 48,
        bottom: 48
      }
    },

    downloadIcon: {
      width: 32,
      height: 32,

      [theme.breakpoints.md()]: {
        width: 40,
        height: 40
      }
    }
  }),
  {
    name: 'DocumentCard'
  }
);
