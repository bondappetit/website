import { createUseStyles } from 'react-jss';

export const useBagFaqStyles = createUseStyles(
  {
    title: {
      marginBottom: 56
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
    name: 'BagFaq'
  }
);
