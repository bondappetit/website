import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutMenuStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: 0,
      margin: 0,
      listStyle: 'none'
    },

    menu: {
      display: 'flex',
      flexWrap: 'wrap'
    },

    menuItem: {
      padding: '0 4px',
      position: 'relative',
      textAlign: 'center',
      fontSize: 20,
      lineHeight: '28px',

      [theme.breakpoints.lg()]: {
        textAlign: 'left',
        fontSize: 16,
        lineHeight: '18px'
      }
    },

    dropdown: {
      borderRadius: 16,
      top: '125%',
      width: '100%',
      zIndex: 400,

      [theme.breakpoints.lg()]: {
        border: `1px solid ${theme.colors.primary}`,
        background: theme.colors.secondary,
        position: 'absolute',
        padding: 16
      }
    },

    dropdownItem: {
      marginBottom: 32,

      [theme.breakpoints.lg()]: {
        marginBottom: 12,

        '&:last-child': {
          marginBottom: 0
        }
      }
    },

    navLink: {
      boxSizing: 'border-box',
      display: 'inline-block',
      color: theme.colors.primary,
      textDecoration: 'none',
      marginBottom: 32,

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1
        },

        '&:active': {
          transform: 'none'
        }
      },

      [theme.breakpoints.lg()]: {
        border: `1px solid ${theme.colors.primary}`,
        borderRadius: 16,
        padding: '6px 16px',
        marginBottom: 0
      }
    },

    activeNavLink: {
      [theme.breakpoints.lg()]: {
        background: theme.colors.primary,
        color: theme.colors.secondary
      }
    },

    toggleTheme: {
      [theme.breakpoints.lg()]: {
        display: 'none'
      }
    }
  }),
  {
    name: 'LayoutMenu'
  }
);
