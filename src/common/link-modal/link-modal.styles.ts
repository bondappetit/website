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
    },

    fromProtocol: {
      flexDirection: 'column',
      height: 'auto',
      padding: 40
    },

    buttonTitle: {
      marginBottom: 8
    },

    bagIcon: {
      marginBottom: -2
    }
  },
  {
    name: 'LinkModal'
  }
);
