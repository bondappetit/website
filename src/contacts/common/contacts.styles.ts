import { createUseStyles } from 'react-jss';

export const useContactsStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },

    inner: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto 0'
    },

    modalButton: {
      width: '100%'
    },

    input: {
      margin: 0,
      fontSize: 20,
      lineHeight: '28px',
      height: 28,

      '&:not(:last-child)': {
        marginBottom: 16
      }
    }
  },
  {
    name: 'Contacts'
  }
);
