import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useInvestingStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      maxWidth: 1200,
      margin: '0 auto'
    },

    investingForm: {
      margin: '56px auto 0',

      [theme.breakpoints.md()]: {
        maxWidth: 756,
        margin: '96px auto 200px'
      }
    },

    announcement: {
      margin: '56px auto 0',

      [theme.breakpoints.md()]: {
        margin: '96px auto 200px'
      }
    },

    button: {
      display: 'none',
      justifyContent: 'center',
      marginBottom: 145,

      [theme.breakpoints.md()]: {
        display: 'flex'
      }
    },

    statistic: {
      marginTop: 120,

      [theme.breakpoints.md()]: {
        marginTop: 0
      }
    },

    documents: {
      marginTop: 136,

      [theme.breakpoints.md()]: {
        marginTop: 200
      }
    }
  }),
  {
    name: 'Investing'
  }
);
