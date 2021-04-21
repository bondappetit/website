import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralIssuerStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      maxWidth: 960,
      margin: 'auto'
    },

    description: {
      marginBottom: 104
    },

    list: {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      width: '100%'
    },

    listItem: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',

      '&:not(:last-child)': {
        marginBottom: 24
      },

      '& > *': {
        minWidth: 0
      },

      '& > div > *:first-child': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        maxWidth: '100%'
      }
    },

    spacer: {
      height: 2,
      flexGrow: 2,
      borderBottom: `2px dotted ${theme.colors.primary}`,
      margin: 'auto 9px 9px'
    },

    flag: {
      marginRight: 12,
      borderRadius: 4
    }
  }),
  {
    name: 'CollateralIssuer'
  }
);
