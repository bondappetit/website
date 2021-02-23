import { createUseStyles } from 'react-jss';
import { rgba } from 'polished';

import { Theme } from 'src/common';

export const useModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      position: 'fixed',
      zIndex: 9999,
      overflowX: 'hidden',
      overflowY: 'scroll',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },

    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: rgba(theme.colors.black, 0.4),
      color: theme.colors.secondary
    },

    child: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 340,

      [theme.breakpoints.md()]: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 560,
        width: 496
      }
    }
  }),
  {
    name: 'Modal'
  }
);
