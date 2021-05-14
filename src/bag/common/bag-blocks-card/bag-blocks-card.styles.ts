import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useBagBlocksCardStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '40px 24px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 320,

      [theme.breakpoints.md()]: {
        minHeight: 400,
        padding: '54px 48px 48px'
      }
    },

    title: {
      marginBottom: 48
    },

    button: {
      width: '100%',
      marginTop: 'auto'
    },

    icons: {
      display: 'flex',
      marginBottom: 48
    },

    progress: {
      width: '100%',
      height: 12,
      borderRadius: 8,
      border: `1px solid ${theme.colors.primary}`,
      marginTop: 12,
      marginBottom: 12,

      '&:before': {
        content: '""',
        width: (props: { percent: number }) => `${props.percent}%`,
        display: 'block',
        height: 10,
        background: theme.colors.primary,
        borderRadius: 8
      },

      [theme.breakpoints.md()]: {
        marginTop: 16,
        marginBottom: 16
      }
    }
  }),
  {
    name: 'BagBlocksCard'
  }
);
