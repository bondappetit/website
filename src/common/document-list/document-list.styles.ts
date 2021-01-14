import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useDocumentListStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      marginBottom: 40,

      '& br': {
        display: 'none'
      },

      [theme.breakpoints.md()]: {
        marginBottom: 64,

        '& br': {
          display: 'block'
        }
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
