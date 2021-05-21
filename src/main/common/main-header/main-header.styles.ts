import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

const HEADER_DESKTOP = 79;
const HEADER_MOBILE = 59;

export const useMainHeaderStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: `calc(100vh - ${HEADER_MOBILE}px)`,

      [theme.breakpoints.lg()]: {
        minHeight: `calc(100vh - ${HEADER_DESKTOP}px)`
      }
    },

    title: {
      maxWidth: 1200,
      margin: '0 auto 24px'
    },

    content: {
      margin: 'auto'
    },

    playIcon: {
      width: 14,
      height: 19,
      marginRight: 22,
      marginTop: -4
    },

    action: {
      display: 'grid',
      alignItems: 'center',
      justifyContent: 'center',
      gridGap: 16,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '283px 283px'
      }
    },

    stat: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: 36
    }
  }),
  {
    name: 'MainHeader'
  }
);
