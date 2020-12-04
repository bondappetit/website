import { createUseStyles } from 'react-jss';
import { rgba } from 'polished';

import { Theme } from 'src/common';

export const useSmallModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.primary,
      maxWidth: 496,
      height: '100%',
      maxHeight: 560,
      width: '100%',
      boxShadow: `0px 36px 85px ${rgba(theme.colors.primary, 0.09)},
        0px 15.719px 38.8242px ${rgba(theme.colors.primary, 0.0594795)},
        0px 8.79904px 21.4607px ${rgba(theme.colors.primary, 0.0470579)},
        0px 5.06402px 12.062px ${rgba(theme.colors.primary, 0.0381501)},
        0px 2.72989px 6.27332px ${rgba(theme.colors.primary, 0.0300574)},
        0px 1.14455px 2.50314px ${rgba(theme.colors.primary, 0.0205126)}`,
      borderRadius: 24,
      position: 'relative'
    },

    header: {
      padding: '8px 8px 0',
      display: 'flex'
    },

    closeButton: {
      width: 40,
      height: 40,
      marginLeft: 'auto',
      display: 'block'
    },

    backButton: {
      width: 40,
      height: 40,
      color: theme.colors.primary,

      '& svg': {
        height: 'inherit',
        width: 'inherit'
      }
    },

    content: {
      padding: `8px 40px 40px`,
      height: 'calc(100% - 48px)'
    }
  }),
  {
    name: 'SmallModal'
  }
);
