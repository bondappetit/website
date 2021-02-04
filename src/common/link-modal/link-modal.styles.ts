import { createUseStyles } from 'react-jss';

export const useLinkModalStyles = createUseStyles(
  {
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
    }
  },
  {
    name: 'LinkModal'
  }
);
