import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useDocsRendererTableStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'block',
      width: '100%',
      overflowX: 'auto',
      maxWidth: 'calc(100vw - 30px)',

      [theme.breakpoints.lg()]: {
        display: 'unset',
        width: 'unset',
        overflowX: 'unset'
      }
    },

    table: {
      width: '100%'
    }
  }),
  {
    name: 'DocsRendererTable'
  }
);
