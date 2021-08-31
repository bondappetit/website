import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutFooterStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '0 16px',
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        marginBottom: 36,
        padding: '0 64px'
      }
    },

    grid: {
      display: 'grid',
      marginBottom: 64,
      gridTemplateColumns: 'repeat(auto-fit, minmax(188px, 1fr))',
      gridGap: 40
    },

    copyright: {
      opacity: 0.4
    },

    mb8: {
      marginBottom: 8
    },

    list: {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    },

    link: {
      display: 'flex',
      alignItems: 'center'
    },

    icon: {
      verticalAlign: 'middle',

      '&:last-of-type': {
        marginRight: 8
      }
    }
  }),
  {
    name: 'LayoutFooter'
  }
);
