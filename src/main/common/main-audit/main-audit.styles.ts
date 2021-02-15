import { createUseStyles } from 'react-jss';

export const useMainAuditStyles = createUseStyles(
  {
    root: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: 48,
      position: 'relative'
    },

    title: {
      marginBottom: 8,
      display: 'inline-flex',
      alignItems: 'center'
    },

    auditedIcon: {
      position: 'absolute',
      right: -22,
      top: 3
    }
  },
  {
    name: 'MainAudit'
  }
);
