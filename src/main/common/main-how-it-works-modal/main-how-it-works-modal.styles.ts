import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainHowItWorksModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      maxWidth: 900,
      position: 'relative',
      margin: 'auto',
      background: theme.colors.black,
      borderRadius: 16,

      [theme.breakpoints.md()]: {
        borderRadius: 24
      }
    },

    modal: {
      width: '100%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: 'auto',
      bottom: 'unset'
    },

    icon: {
      position: 'absolute',
      right: 0,
      top: -27,
      color: theme.colors.primary
    }
  }),
  {
    name: 'MainHowItWorksModal'
  }
);
