import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBagCalculatorStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    table: {
      padding: '24px 16px 40px',
      display: 'grid',

      [theme.breakpoints.md()]: {
        padding: '54px 64px',
        gridTemplateAreas: `
        "t howitworks samplecalculation"
        "num1 text1 value1"
        "num2 text2 value2"
        "num3 text3 value3"
        "num4 text4 value4"
        `,
        gridTemplateColumns: '136px 1fr 1fr'
      }
    },

    headCol: {
      marginBottom: 32,

      [theme.breakpoints.md()]: {
        marginBottom: 0,
        paddingBottom: 56
      }
    },

    howItWorks: {
      [theme.breakpoints.md()]: {
        gridArea: 'howitworks'
      }
    },

    sampleCalculation: {
      borderTop: `1px solid ${rgba(theme.colors.primary, 0.16)}`,
      paddingTop: 40,

      [theme.breakpoints.md()]: {
        gridArea: 'samplecalculation',
        padding: 0,
        border: 'none'
      }
    },

    borderTop: {
      [theme.breakpoints.md()]: {
        borderTop: `1px solid ${rgba(theme.colors.primary, 0.16)}`,
        paddingTop: 16
      }
    },

    num1: {
      [theme.breakpoints.md()]: {
        gridArea: 'num1'
      }
    },

    num2: {
      [theme.breakpoints.md()]: {
        gridArea: 'num2'
      }
    },

    num3: {
      [theme.breakpoints.md()]: {
        gridArea: 'num3'
      }
    },

    num4: {
      [theme.breakpoints.md()]: {
        gridArea: 'num4'
      }
    },

    text1: {
      [theme.breakpoints.md()]: {
        gridArea: 'text1',
        paddingRight: 112
      }
    },

    text2: {
      [theme.breakpoints.md()]: {
        gridArea: 'text2',
        paddingRight: 112
      }
    },

    text3: {
      [theme.breakpoints.md()]: {
        gridArea: 'text3',
        paddingRight: 112
      }
    },

    text4: {
      [theme.breakpoints.md()]: {
        gridArea: 'text4',
        paddingRight: 112
      }
    },

    value1: {
      [theme.breakpoints.md()]: {
        gridArea: 'value1'
      }
    },

    value2: {
      [theme.breakpoints.md()]: {
        gridArea: 'value2'
      }
    },

    value3: {
      [theme.breakpoints.md()]: {
        gridArea: 'value3'
      }
    },

    value4: {
      [theme.breakpoints.md()]: {
        gridArea: 'value4'
      }
    },

    col: {
      '&:not(:last-child)': {
        paddingBottom: 61
      },

      [theme.breakpoints.md()]: {
        '&:not(:last-child)': {
          paddingBottom: 56
        }
      }
    },

    hint: {
      opacity: 0.4,
      display: 'none',
      margin: '0 64px 56px',
      paddingTop: 24,

      [theme.breakpoints.md()]: {
        display: 'block'
      }
    },

    colGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: 16,

      '& > div': {
        '&:nth-child(1), &:nth-child(2)': {
          paddingBottom: 61 - 16
        }
      }
    },

    slider: {
      [theme.breakpoints.md()]: {
        maxWidth: 200
      },

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
    },

    step: {
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        marginBottom: 0
      }
    }
  }),
  {
    name: 'BagCalculator'
  }
);
