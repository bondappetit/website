import { createUseStyles } from 'react-jss';

export const useMainTextCardStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },

    content: {
      width: '100%'
    }
  },
  {
    name: 'MainTextCard'
  }
);
