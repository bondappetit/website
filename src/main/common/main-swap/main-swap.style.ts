import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common/theme/theme';

export const useMainSwapStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      background: theme.colors.swap,
      color: theme.colors.primary,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: '12px 16px',

      [theme.breakpoints.lg()]: {
        padding: '12px 32px'
      }
    },

    content: {
      marginBottom: 10,

      [theme.breakpoints.lg()]: {
        marginBottom: 0,
        display: 'flex'
      }
    },

    actions: {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',

      [theme.breakpoints.lg()]: {
        flexDirection: 'row',
        width: 'auto'
      }
    },

    actionsItem: {
      marginBottom: 8,

      [theme.breakpoints.lg()]: {
        marginRight: 15,
        marginBottom: 0
      }
    },

    icons: {
      paddingRight: 8,
      display: 'inline-flex',
      verticalAlign: 'middle',

      [theme.breakpoints.md()]: {
        paddingRight: 16
      }
    },

    iconsItem: {
      width: 24,
      height: 24,

      '&:last-child': {
        marginLeft: -3
      }
    },

    text: {
      display: 'inline'
    }
  }),
  {
    name: 'MainSwap'
  }
);
