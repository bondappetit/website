import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useWhitepaperStyles = createUseStyles(
  (theme: Theme) => ({
    header: {
      marginBottom: 52,

      [theme.breakpoints.lg()]: {
        marginBottom: 104
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
