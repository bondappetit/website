import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMarketFormsStyles = createUseStyles(
  (theme: Theme) => ({
    market: {
      padding: '48px 16px 104px',

      [theme.breakpoints.md()]: {
        padding: '82px 64px 160px'
      }
    },

    form: {
      margin: '56px auto 0',

      [theme.breakpoints.md()]: {
        maxWidth: 756,
        margin: '96px auto 122px'
      }
    }
  }),
  {
    name: 'MarketForms'
  }
);
