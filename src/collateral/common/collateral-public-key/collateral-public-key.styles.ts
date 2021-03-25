import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralPublicKeyStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: 1
    },

    button: {
      borderRadius: 8,
      padding: '8px 16px 16px',
      margin: '-8px -16px -16px',
      flexDirection: 'column',
      alignItems: 'flex-start',

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1,
          background: theme.colors.proposalPlate
        }
      }
    },

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },

    title: {
      color: rgba(theme.colors.primary, 0.4)
    },

    green: {
      color: theme.colors.superGreen
    },

    text: {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all'
    }
  }),
  {
    name: 'CollateralPublicKey'
  }
);
