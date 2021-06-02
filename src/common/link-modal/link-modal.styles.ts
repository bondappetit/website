import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useLinkModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      justifyContent: 'center'
    },

    buttons: {
      margin: 'auto 0',
      display: 'flex',
      flexDirection: 'column'
    },

    button: {
      display: 'flex',
      fontSize: 32,
      lineHeight: '40px',
      height: 64,

      '&:not(:last-child)': {
        marginBottom: 24
      }
    },

    fromProtocol: {
      flexDirection: 'column',
      height: 'auto',
      padding: '40px 31px'
    },

    buttonTitle: {
      marginBottom: 8,
      fontSize: 24,
      lineHeight: '32px',

      [theme.breakpoints.md()]: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit'
      }
    },

    bagIcon: {
      marginBottom: -2
    }
  }),
  {
    name: 'LinkModal'
  }
);
