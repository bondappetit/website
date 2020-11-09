import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useDocumentsStyles = createUseStyles((theme: Theme) => ({
  documents: {
    position: 'relative',
    zIndex: 1
  },

  title: {
    marginBottom: 40,

    '& br': {
      display: 'none'
    },

    [theme.breakpoints.md()]: {
      marginBottom: 64,

      '& br': {
        display: 'block'
      }
    }
  },

  row: {
    marginTop: 64,
    display: 'grid',
    gridGap: 44,

    [theme.breakpoints.md()]: {
      gridGap: 48,
      gridTemplateColumns: '1fr 1fr'
    }
  }
}));
