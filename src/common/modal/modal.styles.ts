import { createUseStyles } from 'react-jss';
import { rgba } from 'polished';

import { Theme } from 'src/common';

export const useModalStyles = createUseStyles(
  (theme: Theme) => ({
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: rgba(theme.colors.primary, 0.4),
      color: theme.colors.secondary,
      zIndex: 9999,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
  {
    name: 'Modal'
  }
);
