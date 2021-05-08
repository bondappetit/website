import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBagCalculatorStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    table: {
      padding: '16px 24px',

      [theme.breakpoints.md()]: {
        padding: '54px 64px'
      }
    },

    head: {
      display: 'grid',
      marginBottom: 56,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: '136px 1fr 1fr'
      }
    },

    headCol: {
      [theme.breakpoints.md()]: {
        gridColumnStart: 2
      }
    },

    list: {
      padding: 0,
      margin: '0 0 24px',
      listStyle: 'none',
      counterReset: 'counter'
    },

    row: {
      display: 'grid',
      borderBottom: `1px solid ${rgba(theme.colors.primary, 0.16)}`,
      padding: '16px 0 56px',
      counterIncrement: 'counter',
      gridGap: 10,

      '&:first-child': {
        borderTop: `1px solid ${rgba(theme.colors.primary, 0.16)}`
      },

      '&:before': {
        content: 'counter(counter)',
        fontSize: 16,
        lineHeight: '20px',

        [theme.breakpoints.md()]: {
          fontSize: 20,
          lineHeight: '28px'
        }
      },

      [theme.breakpoints.md()]: {
        gridGap: 0,
        gridTemplateColumns: '136px 1fr 1fr'
      }
    },

    col: {
      [theme.breakpoints.md()]: {
        paddingLeft: 112
      }
    },

    hint: {
      opacity: 0.4
    },

    colGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: 52
    },

    slider: {
      maxWidth: 200,

      '& > div.rc-slider-handle': {
        background: theme.colors.primary,
        border: 'none',
        height: 12,
        width: 12,

        '&:active': {
          boxShadow: `none`
        }
      },

      '& > div.rc-slider-rail': {
        background: theme.colors.primary,
        opacity: 0.16,
        height: 1
      },

      '& > div.rc-slider-track': {
        background: theme.colors.primary,
        height: 1
      }
    },

    title: {
      marginBottom: 8
    }
  }),
  {
    name: 'BagCalculator'
  }
);
