import { createUseStyles } from 'react-jss';

export const useContactsSuccessStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center'
    },

    text: {
      margin: 'auto',
      maxWidth: 400
    },

    button: {
      width: '100%'
    }
  },
  {
    name: 'ContactsSuccess'
  }
);
