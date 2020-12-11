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
      position: 'relative'
    },

    dropdown: {
      border: `1px solid ${theme.colors.primary}`,
      background: theme.colors.secondary,
      position: 'absolute',
      padding: 16,
      borderRadius: 16,
      top: '125%',
      width: '100%'
    },

    dropdownItem: {
      '&:not(:last-child)': {
        marginBottom: 12
      }
    },

    navLink: {
      border: `1px solid ${theme.colors.primary}`,
      boxSizing: 'border-box',
      borderRadius: 16,
      padding: '6px 16px',
      display: 'inline-block',
      color: theme.colors.primary,
      textDecoration: 'none',

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1
        },

        '&:active': {
          transform: 'none'
        }
      }
    },

    activeNavLink: {
      background: theme.colors.primary,
      color: theme.colors.secondary
    }
  }),
  {
    name: 'LayoutMenu'
  }
);
