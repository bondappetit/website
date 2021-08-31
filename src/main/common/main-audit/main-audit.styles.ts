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
      color: theme.colors.green1
    },

    text: {
      marginBottom: 8
    },

    logo: {
      display: 'inline-block',
      bottom: '-4px',
      position: 'relative',
      verticalAlign: 'middle'
    }
  }),
  {
    name: 'MainAudit'
  }
);
