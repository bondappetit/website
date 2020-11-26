import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStackingCardStyles = createUseStyles((theme: Theme) => ({
  stakingCard: {
    padding: '48px',
    width: '100%',

    [theme.breakpoints.md()]: {
      padding: '82px'
    }
  }
}));
