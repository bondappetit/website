import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useWalletProfileStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative'
    },

    dropdown: {
      position: 'absolute',
      right: 0,
      top: 0
    },

    plate: {
      width: 512,
      height: 248,
      padding: 24,
      flexDirection: 'column'
    },

    header: {
      justifyContent: 'space-between',
      borderBottom: `1px solid ${rgba(theme.colors.primary, 0.08)}`,
      paddingBottom: 16,
      marginBottom: 16
    },

    row: {
      display: 'flex'
    },

    col35: {
      width: '35%'
    },

    col30: {
      width: '30%'
    },

    mb8: {
      marginBottom: 8
    },

    footer: {
      borderTop: `1px solid ${rgba(theme.colors.primary, 0.08)}`,
      paddingTop: 16,
      marginTop: 16
    },

    button: {
      marginTop: 'auto'
    }
  }),
  {
    name: 'WalletProfile'
  }
);
