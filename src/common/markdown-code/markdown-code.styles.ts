import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMarkdownCodeStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: theme.colors.proposalPlate,
      borderRadius: 8,
      padding: '10px 8px',
      maxWidth: '100%',
      overflowX: 'auto',
      position: 'relative'
    },

    button: {
      position: 'absolute',
      right: 8,
      top: 8,
      backgroundColor: theme.colors.secondary,
      padding: '2px 8px',
      borderRadius: 5,

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1
        }
      }
    }
  }),
  {
    name: 'MarkdownCode'
  }
);
