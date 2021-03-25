import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useMainWavesStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    title: {
      maxWidth: 800,
      margin: '0 auto 47px'
    },

    list: {
      display: 'grid',
      gridGap: 16,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '1fr 1fr',
        gridGap: 48
      }
    }
  }),
  {
    name: 'MainWaves'
  }
);
