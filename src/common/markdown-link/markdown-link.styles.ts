import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useMarkdownLinkStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      color: theme.colors.darkBlue
    }
  }),
  {
    name: 'MarkdownLink'
  }
);
