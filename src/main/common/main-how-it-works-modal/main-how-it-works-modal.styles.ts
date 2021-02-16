import { createUseStyles } from 'react-jss';

export const useMainHowItWorksModalStyles = createUseStyles(
  {
    root: {
      width: '100%',
      maxWidth: 900,
      position: 'relative'
    },

    icon: {
      position: 'absolute',
      right: 0,
      top: -27
    }
  },
  {
    name: 'MainHowItWorksModal'
  }
);
