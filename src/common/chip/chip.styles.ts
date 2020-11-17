import { createUseStyles } from 'react-jss';
import { rgba, darken } from 'polished';

import { Theme } from 'src/common';

export const useChipStyles = createUseStyles((theme: Theme) => ({
  chip: {
    margin: 0,
    minWidth: 0,
    color: darken(0.1, theme.colors.tokenTitleLine),
    backgroundColor: rgba(theme.colors.tokenTitleLine, 0.1),
    fontWeight: 500,
    borderRadius: 12,
    padding: '8px 12px'
  }
}));
