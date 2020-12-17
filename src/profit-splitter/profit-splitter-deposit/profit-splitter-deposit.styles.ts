import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useProfitSplitterDepositStyles = createUseStyles(
  (theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.colors.error,
      color: 'white',
      borderRadius: 8,
      padding: 8,
      fontSize: 14,
      lineHeight: '20px',
      transition: 'none'
    }
  }),
  {
    name: 'ProfitSplitterDeposit'
  }
);
