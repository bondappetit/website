import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useContactsFeedbackStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },

    input: {
      textAlign: 'center'
    },

    button: {
      marginTop: 56,

      [theme.breakpoints.md()]: {
        width: 320
      }
    }
  }),
  {
    name: 'ContactsFeedback'
  }
);
