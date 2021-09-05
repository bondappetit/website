import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinGraphStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridGap: 24,

      [theme.breakpoints.md()]: {
        gridGap: 40,
        gridTemplateColumns: '1fr 416px'
      }
    },

    inner: {
      padding: '32px 16px',

      [theme.breakpoints.md()]: {
        padding: '20px 36px'
      },

      [theme.breakpoints.lg()]: {
        padding: '40px 56px'
      }
    },

    title: {
      marginBottom: 32,
      fontSize: 14,
      lineHeight: '16px',

      [theme.breakpoints.md()]: {
        marginBottom: 22,
        fontSize: 16,
        lineHeight: '24px'
      }
    },

    chart: {
      position: 'relative',
      height: 200,
      maxWidth: 766,
      margin: '0 auto',

      [theme.breakpoints.md()]: {
        height: 272
      }
    }
  }),
  {
    name: 'StablecoinGraph'
  }
);
