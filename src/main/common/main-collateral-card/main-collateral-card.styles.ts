import { createUseStyles } from 'react-jss';

export const useMainCollateralCardStyles = createUseStyles(
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
    name: 'MainCollateralCard'
  }
);
