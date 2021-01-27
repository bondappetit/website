import { createUseStyles } from 'react-jss';

export const useLinkModalStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      justifyContent: 'center'
    },

    button: {
      display: 'flex',
      flexDirection: 'column',

      '&:not(:last-child)': {
        marginBottom: 'auto'
      }
    }
  },
  {
    name: 'LinkModal'
  }
);
