import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingAttentionModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },

    content: {
      margin: '0 0 auto',

      '& > *:not(:last-child)': {
        marginBottom: 16
      }
    },

    button: {
      marginTop: 'auto'
    },

    attention: {
      color: theme.colors.red
    }
  }),
  {
    name: 'StakingAttentionModal'
  }
);
