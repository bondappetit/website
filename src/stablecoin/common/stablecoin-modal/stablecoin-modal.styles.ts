import { createUseStyles } from 'react-jss';

export const useStablecoinModalStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      justifyContent: 'space-between'
    },

    button: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  {
    name: 'StablecoinModal'
  }
);
