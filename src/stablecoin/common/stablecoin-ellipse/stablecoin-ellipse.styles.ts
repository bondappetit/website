import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinEllipseStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 416px',
      gridGap: 40
    },

    graph: {
      padding: '40px 56px'
    },

    info: {
      '& *:first-child': {
        marginBottom: 8
      }
    },

    sellingBuying: {
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 63px 64px',
      minHeight: 400
    },

    actions: {
      width: '100%',
      maxWidth: 240,
      margin: 'auto auto 0',
      display: 'flex',
      flexDirection: 'column',

      '& button:first-child': {
        marginBottom: 16
      }
    },

    skeleton: {
      width: 150,
      display: 'inline-block'
    }
  }),
  {
    name: 'StablecoinEllipse'
  }
);
