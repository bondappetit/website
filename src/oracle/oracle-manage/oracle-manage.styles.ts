import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useOracleManageStyles = createUseStyles((theme: Theme) => ({
  oracle: {
    padding: '48px 16px 104px',

    [theme.breakpoints.md()]: {
      padding: '82px 64px 160px'
    }
  }
}));
