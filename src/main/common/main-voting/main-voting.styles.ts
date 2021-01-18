import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainVotingStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      maxWidth: 800,
      margin: '0 auto 48px'
    },

    block: {
      borderRadius: 24,
      border: `1px solid ${theme.colors.primary}`,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 43,
      padding: 32,

      [theme.breakpoints.lg()]: {
        marginBottom: 48,
        padding: [40, 48]
      }
    },

    text: {
      width: '100%',

      [theme.breakpoints.lg()]: {
        width: 'calc(100% - 509px)'
      }
    },

    tickets: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      bottom: -26,

      [theme.breakpoints.lg()]: {
        width: '509px',
        right: -62,
        bottom: 'unset'
      }
    },

    ticket: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid transparent',
      height: 80,
      borderRadius: 16,
      fontSize: 24,
      lineHeight: '32px',
      backgroundColor: theme.colors.secondary,

      [theme.breakpoints.lg()]: {
        borderRadius: 24,
        height: 120,
        fontSize: 40,
        lineHeight: '48px'
      }
    },

    against: {
      borderColor: theme.colors.red,
      transformOrigin: 'center',
      width: 280,
      transform: 'rotate(-8deg) translateY(14px)',

      [theme.breakpoints.lg()]: {
        width: 400,
        transform: 'rotate(-8deg) translateY(4px)'
      }
    },

    for: {
      borderColor: theme.colors.green,
      width: 240,
      transformOrigin: 'center',
      transform: 'rotate(8deg)',

      [theme.breakpoints.lg()]: {
        width: 356,
        transform: 'rotate(8deg) translateX(-74px)'
      }
    }
  }),
  {
    name: 'MainVoting'
  }
);
