import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWhitepaperStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      padding: '32px 15px 15px',

      [theme.breakpoints.md()]: {
        padding: '52px 34px 34px'
      },

      [theme.breakpoints.lg()]: {
        padding: '104px 64px 64px'
      }
    },

    list: {
      width: 216,
      marginRight: 30,
      position: 'sticky',
      top: 64,
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'block',
        marginRight: 60
      },

      [theme.breakpoints.lg()]: {
        marginRight: 120
      }
    },

    markdown: {
      margin: 'auto',
      maxWidth: 800,

      [theme.breakpoints.md()]: {
        margin: 'unset'
      }
    }
  }),
  {
    name: 'Whitepaper'
  }
);
