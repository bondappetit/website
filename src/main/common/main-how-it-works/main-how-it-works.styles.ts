import { createUseStyles } from 'react-jss';

export const useMainHowItWorksStyles = createUseStyles(
  {
    root: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      paddingTop: '56.25%'
    },

    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%'
    }
  },
  {
    name: 'MainHowItWorks'
  }
);
