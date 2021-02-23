import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useDocsRendererStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      padding: '32px 15px 15px',

      [theme.breakpoints.md()]: {
        padding: '52px 34px 34px'
      },

      [theme.breakpoints.lg()]: {
        padding: '120px 64px 64px'
      }
    },

    mobileToolbar: {
      position: 'fixed',
      zIndex: 1,
      bottom: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      background: theme.colors.secondary,
      borderTop: `1px solid ${theme.colors.primary}`,
      alignItems: 'center',
      padding: '10px 15px 10px 12px'
    },

    mobileToolbarIcon: {
      marginRight: 20
    },

    mobileMenu: {
      maxHeight: '100%',
      height: 'auto'
    },

    tableOfContents: {
      position: 'fixed',
      width: '100%',
      left: 0,
      zIndex: 1,
      bottom: 0,
      margin: 0,
      background: theme.colors.secondary,

      [theme.breakpoints.md()]: {
        marginRight: 60,
        paddingLeft: 30,
        marginLeft: -30,
        position: 'sticky',
        minWidth: 216,
        maxWidth: 216,
        top: 64,
        bottom: 'auto',
        maxHeight: 'calc(100vh - 128px)'
      },

      [theme.breakpoints.lg()]: {
        marginRight: 120
      }
    },

    body: {
      margin: 'auto',
      maxWidth: 800,

      [theme.breakpoints.md()]: {
        margin: 'unset'
      }
    }
  }),
  {
    name: 'DocsRenderer'
  }
);
