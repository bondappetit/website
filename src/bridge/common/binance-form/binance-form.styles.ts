import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBridgeFormStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },

    input: {
      textAlign: 'center',
      marginBottom: 4
    },

    max: {
      color: theme.colors.darkBlue,
      marginBottom: 6
    },

    feeWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },

    fee: {},

    approve: {
      marginRight: 16
    }
  }),
  {
    name: 'BridgeForm'
  }
);
