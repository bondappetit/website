import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const usePlateStyles = createUseStyles((theme: Theme) => ({
  plate: {
    border: `2px dashed ${theme.colors.primary}`,
    borderRadius: 24,
    backgroundColor: theme.colors.secondary
  }
}));
