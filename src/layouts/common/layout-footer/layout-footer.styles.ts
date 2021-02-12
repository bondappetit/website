import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutFooterStyles = createUseStyles(
  (theme: Theme) => ({
    footer: {
      display: 'flex',
      padding: '0 16px',
      marginBottom: 24,
      justifyContent: 'center',
      alignItems: 'center',

      [theme.breakpoints.md()]: {
        marginBottom: 36,
        padding: '0 37px',
        justifyContent: 'space-between'
      }
    },

    copyright: {
      [theme.breakpoints.md()]: {
        width: 216
      }
    },

    links: {
      display: 'none',

      [theme.breakpoints.lg()]: {
        display: 'flex'
      }
    },

    button: {
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 16,
      padding: '0 16px 0 8px',
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'inline-flex'
      }
    },

    icon: {
      marginRight: 8
    }
  }),
  {
    name: 'LayoutFooter'
  }
);
