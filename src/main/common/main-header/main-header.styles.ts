import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';
import { config } from 'src/config';

const HEADER_DESKTOP = config.BUY_BACK_ENABLE ? 135 : 79;
const HEADER_MOBILE = config.BUY_BACK_ENABLE ? 217 : 59;

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
    },

    live: {
      display: 'flex',
      alignItems: 'center',
      verticalAlign: 'middle'
    },

    liveIndicator: {
      background: theme.colors.red,
      width: 8,
      height: 8,
      borderRadius: '50%',
      marginLeft: 5
    }
  }),
  {
    name: 'MainHeader'
  }
);
