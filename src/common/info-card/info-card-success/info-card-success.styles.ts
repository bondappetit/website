import { createUseStyles } from 'react-jss';

export const useInfoCardSuccessStyles = createUseStyles(
  {
    greenLine: {
      position: 'absolute',
      width: '100%',
      top: 4,
      bottom: 0,
      left: 0,
      zIndex: -1
    }
  },
  {
    name: 'InfoCardSuccess'
  }
);
