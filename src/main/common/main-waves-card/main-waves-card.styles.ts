import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainWavesCardStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '16px 24px 24px',
      minHeight: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',

      [theme.breakpoints.md()]: {
        minHeight: 400,
        padding: '32px 48px 48px'
      }
    },

    icon: {
      marginBottom: 16,
      '--color': theme.colors.secondary
    },

    text: {
      marginBottom: 'auto'
    },

    link: {
      marginTop: 40,

      [theme.breakpoints.md()]: {
        marginTop: 80
      }
    },

    linkContent: {
      color: theme.colors.blue2
    }
  }),
  {
    name: 'MainWavesCard'
  }
);
