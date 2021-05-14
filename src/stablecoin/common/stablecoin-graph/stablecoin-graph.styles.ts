import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinGraphStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridGap: 24,

      [theme.breakpoints.md()]: {
        gridGap: 40,
        gridTemplateColumns: '1fr 416px'
      }
    },

    graph: {
      padding: '40px 56px'
    },

    lines: {
      height: 230,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },

    line: {
      height: 1,
      background: rgba(theme.colors.primary, 0.08),
      position: 'relative'
    },

    lineLegend: {
      color: rgba(theme.colors.primary, 0.24),
      position: 'relative'
    }
  }),
  {
    name: 'StablecoinGraph'
  }
);
