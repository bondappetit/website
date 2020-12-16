import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLinkIfAccountStyles = createUseStyles(
  (theme: Theme) => ({
    link: {
      color: theme.colors.darkBlue
    }
  }),
  {
    name: 'LinkIfAccount'
  }
);
