import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingEmptyStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      opacity: 0.4,
      border: `1px solid ${theme.colors.primary}`,
      boxSizing: 'border-box',
      borderRadius: 16,
      height: 62
    }
  }),
  {
    name: 'StakingEmpty'
  }
);
