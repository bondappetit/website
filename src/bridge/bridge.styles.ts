import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBridgeStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      maxWidth: 640,
      margin: '0 auto'
    },

    tabs: {
      display: 'flex',
      border: `1px solid ${theme.colors.primary}`,
      boxSizing: 'border-box',
      borderRadius: 100,
      padding: 4
    },

    tabPane: {
      padding: '14px 20px',
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      width: '50%',

      [theme.breakpoints.md()]: {
        padding: '28px 32px'
      },

      '& h3': {
        opacity: 0.4
      },

      '& svg': {
        opacity: 0.8
      }
    },

    tabPaneActive: {
      backgroundColor: theme.colors.proposalPlate,

      '& h3': {
        opacity: 1
      },

      '& svg': {
        opacity: 1
      }
    },

    tabIcon: {
      width: 32,
      height: 32,
      marginRight: 8,

      [theme.breakpoints.md()]: {
        width: 48,
        height: 48,
        marginRight: 16
      }
    },

    contractName: {
      opacity: 0.4
    },

    mb: {
      marginBottom: 16,

      [theme.breakpoints.md()]: {
        marginBottom: 40
      }
    },

    input: {
      height: 'auto'
    },

    form: {
      borderRadius: 16,
      minHeight: 280,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    transactions: {
      marginBottom: 64,

      [theme.breakpoints.md()]: {
        marginBottom: 40
      }
    },

    emptyCard: {
      padding: '28px 32px'
    },

    emptyCardTitle: {
      opacity: 0.4
    },

    card: {
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      borderRadius: 12,

      [theme.breakpoints.md()]: {
        padding: '28px 24px'
      },

      '&:not(:last-child)': {
        marginBottom: 4
      }
    },

    typography: {
      fontSize: 14,
      lineHeight: '20px',

      [theme.breakpoints.md()]: {
        fontSize: 24,
        lineHeight: '32px'
      }
    },

    cardButton: {
      fontSize: 14,
      lineHeight: '20px',
      padding: '6px 12px',
      borderRadius: 6,

      [theme.breakpoints.md()]: {
        padding: '6px 16px',
        fontSize: 20,
        lineHeight: '28px'
      }
    },

    cardIcons: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 12,

      [theme.breakpoints.md()]: {
        marginRight: 16
      }
    },

    cardIcon: {
      width: 24,
      height: 24,

      [theme.breakpoints.md()]: {
        width: 32,
        height: 32
      }
    },

    cardArrow: {
      margin: '0 8px'
    },

    cardStatus: {
      marginLeft: 'auto'
    },

    cardStatusTitle: {
      fontSize: 14,
      lineHeight: '20px',
      color: theme.colors.green1,

      [theme.breakpoints.md()]: {
        fontSize: 20,
        lineHeight: '28px'
      }
    },

    footer: {},

    footerIcon: {
      '--burger': theme.colors.secondary,
      marginBottom: '-4px'
    },

    lostTransaction: {
      color: theme.colors.darkBlue
    }
  }),
  {
    name: 'Bridge'
  }
);
