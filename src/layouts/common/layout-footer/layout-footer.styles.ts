import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutFooterStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      padding: '0 16px',
      marginBottom: 24,
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',

      [theme.breakpoints.md()]: {
        marginBottom: 36,
        padding: '0 37px',
        justifyContent: 'space-between'
      },

      [theme.breakpoints.lg()]: {
        flexWrap: 'nowrap'
      }
    },

    copyright: {
      width: '100%',
      textAlign: 'center',
      order: 2,

      [theme.breakpoints.lg()]: {
        width: 216,
        textAlign: 'left',
        order: 'unset'
      }
    },

    links: {
      width: '100%',
      order: -1,
      marginBottom: 32,

      [theme.breakpoints.lg()]: {
        width: 'auto',
        marginBottom: 'unset',
        order: 'unset'
      }
    },

    subscribe: {
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 16,
      padding: '0 16px 0 8px',
      margin: '0 auto 32px',
      width: '100%',
      maxWidth: '327px',

      [theme.breakpoints.lg()]: {
        margin: 'unset',
        width: 'auto'
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
