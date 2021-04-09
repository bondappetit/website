import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainAuditStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '40px 32px',
      height: 320,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        padding: 48,
        height: 'auto'
      }
    },

    title: {
      marginBottom: 8,
      display: 'inline-flex',
      flexDirection: 'column',

      [theme.breakpoints.md()]: {
        flexDirection: 'row'
      }
    },

    logo: {
      display: 'block',
      width: '100%',
      height: '1em',

      [theme.breakpoints.md()]: {
        width: 'auto'
      }
    },

    auditedIcon: {
      position: 'absolute',
      right: -22,
      top: 3,
      display: 'none',

      [theme.breakpoints.md()]: {
        display: 'block'
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
