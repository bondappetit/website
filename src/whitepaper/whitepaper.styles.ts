import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useWhitepaperStyles = createUseStyles(
  (theme: Theme) => ({
    header: {
      padding: '32px 16px 0',

      [theme.breakpoints.md()]: {
        padding: '80px 16px 0'
      }
    },

    title: {
      marginBottom: 24,

      [theme.breakpoints.lg()]: {
        fontSize: 64,
        lineHeight: '72px'
      }
    },

    link: {
      fontSize: 24,
      lineHeight: '32px',

      '&:not(:last-child)': {
        marginRight: 40
      }
    }
  }),
  {
    name: 'Whitepaper'
  }
);
