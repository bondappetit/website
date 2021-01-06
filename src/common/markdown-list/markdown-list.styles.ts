import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useMarkdownListStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      margin: '0 0 48px',
      padding: '0 0 0 30px'
    },

    listItem: {
      fontSize: 14,
      lineHeight: '20px',

      [theme.breakpoints.md()]: {
        fontSize: 16,
        lineHeight: '20px'
      },

      [theme.breakpoints.lg()]: {
        fontSize: 20,
        lineHeight: '28px'
      },

      '& *': {
        margin: '0 !important'
      },

      '&:not(:last-child)': {
        marginBottom: 15
      }
    }
  }),
  {
    name: 'MarkdownList'
  }
);
