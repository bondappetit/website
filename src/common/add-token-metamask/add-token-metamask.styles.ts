import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useAddTokenMetamaskStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      color: theme.colors.blue2
    }
  }),
  {
    name: 'AddTokenMetamask'
  }
);
