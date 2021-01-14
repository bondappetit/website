import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common/theme';

export const useInfoCardFailureStyles = createUseStyles(
  (theme: Theme) => ({
    heading: {
      color: theme.colors.red
    }
  }),
  {
    name: 'InfoCardFailure'
  }
);
