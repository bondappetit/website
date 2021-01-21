import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralTableStyles = createUseStyles(
  (theme: Theme) => ({
    tableCell: {
      '&:first-child': {
        borderRight: `dotted 1px ${theme.colors.primary}`
      }
    },

    tableCellContent: {
      whiteSpace: 'nowrap'
    },

    pieIcon: {
      marginRight: 8
    }
  }),
  {
    name: 'CollateralTable'
  }
);
