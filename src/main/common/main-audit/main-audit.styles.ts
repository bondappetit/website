import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainAuditStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      background: theme.colors.secondary,

      [theme.breakpoints.md()]: {
        position: 'relative',
        width: 'calc(50% + 20px)',
        left: -20
      }
    },

    content: {
      padding: '40px 32px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',

      [theme.breakpoints.md()]: {
        padding: '64px 78px 72px'
      }
    },

    title: {
      display: 'inline-flex',
      flexDirection: 'column',
      color: theme.colors.green1,

      [theme.breakpoints.md()]: {
        flexDirection: 'row'
      }
    },

    text: {
      marginBottom: 8
    },

    logo: {
      display: 'block',
      width: '100%',
      height: '1em',
      bottom: '-4px',
      position: 'relative',

      [theme.breakpoints.md()]: {
        width: 'auto'
      }
    },

    link: {
      marginTop: 'auto'
    }
  }),
  {
    name: 'MainAudit'
  }
);
