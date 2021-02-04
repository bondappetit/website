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

    list: {
      minWidth: 216,
      maxWidth: 216,
      marginRight: 30,
      paddingLeft: 30,
      marginLeft: -30,
      position: 'sticky',
      top: 64,
      display: 'none',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 128px)',

      [theme.breakpoints.md()]: {
        display: 'block',
        marginRight: 60
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
