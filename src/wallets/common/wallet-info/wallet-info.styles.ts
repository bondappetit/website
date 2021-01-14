import { createUseStyles } from 'react-jss';
import { rgba, transitions } from 'polished';

import { Theme } from 'src/common';

export const useWalletInfoStyles = createUseStyles(
  (theme: Theme) => ({
    wrap: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%'
    },

    button: {
      boxShadow: `0px 0px 0px 1px ${rgba(theme.colors.primary, 0.24)}`,
      borderRadius: 8,
      padding: '4px 23px',
      ...transitions('box-shadow 0.3s ease'),

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1,
          boxShadow: `0px 0px 0px 2px ${theme.colors.primary}`
        }
      }
    },

    subtitle: {
      opacity: 0.4
    },

    accountLogo: {
      position: 'absolute',
      top: 16,
      left: 16
    },

    account: {
      [theme.breakpoints.md()]: {
        fontSize: 64,
        lineHeight: '72px'
      }
    },

    content: {
      margin: 'auto'
    },

    link: {
      marginBottom: 8,

      [theme.breakpoints.md()]: {
        marginBottom: 24
      }
    }
  }),
  {
    name: 'WalletInfo'
  }
);
