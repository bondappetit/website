import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralCheckStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      maxWidth: 416
    },

    invalid: {
      color: theme.colors.red
    },

    valid: {
      color: theme.colors.green1
    },

    description: {
      marginBottom: 48
    },

    card: {
      '&:not(:last-child)': {
        marginBottom: 24
      }
    },

    cardTitle: {
      color: rgba(theme.colors.primary, 0.4)
    },

    cardText: {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all'
    },

    publicKey: {
      whiteSpace: 'pre'
    }
  }),
  {
    name: 'CollateralCheck'
  }
);
