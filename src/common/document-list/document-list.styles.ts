import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useDocumentListStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      maxWidth: 1200,
      margin: '0 auto 40px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 64px'
      }
    },

    row: {
      marginTop: 64,
      display: 'grid',
      gridGap: 44,
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',

      [theme.breakpoints.md()]: {
        gridGap: 48
      }
    }
  }),
  {
    name: 'DocumentList'
  }
);
