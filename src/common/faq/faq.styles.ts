import { createUseStyles } from 'react-jss';

export const useFaqStyles = createUseStyles(
  {
    title: {
      marginBottom: 48
    },

    detail: {
      maxWidth: 800,

      '& *': {
        fontSize: 20,
        lineHeight: '28px'
      }
    }
  },
  {
    name: 'FAQ'
  }
);
