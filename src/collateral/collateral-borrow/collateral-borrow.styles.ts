import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useCollateralBorrowStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      padding: '48px 16px 104px',

      [theme.breakpoints.md()]: {
        padding: '82px 64px 80px'
      }
    },

    wrap: {
      maxWidth: 800,
      margin: 'auto'
    },

    title: {
      marginBottom: 8
    },

    section: {
      '&:not(:last-child)': {
        marginBottom: 104,

        [theme.breakpoints.md()]: {
          marginBottom: 160
        }
      }
    },

    tableTitle: {
      marginBottom: 16
    },

    listTitle: {
      '&:not(:last-of-type)': {
        marginBottom: 64
      }
    },

    list: {
      margin: '16px 0 56px',
      padding: 0,
      listStyle: 'none',
      counterReset: 'li',

      [theme.breakpoints.md()]: {
        margin: '32px 0 80px'
      }
    },

    listItem: {
      display: 'flex',
      counterIncrement: 'li',

      '&:not(:last-child)': {
        marginBottom: 8,

        [theme.breakpoints.md()]: {
          marginBottom: 16
        }
      },

      '&:before': {
        content: 'counter(li)',
        display: 'inline-block',
        marginRight: 16,

        [theme.breakpoints.md()]: {
          fontSize: 20,
          lineHeight: '28px',
          marginRight: 56
        }
      }
    },

    sectionTitle: {
      marginBottom: 16,

      [theme.breakpoints.md()]: {
        marginBottom: 24
      }
    },

    backLink: {
      marginBottom: 24
    }
  }),
  {
    name: 'CollateralBorrow'
  }
);
