import { createUseStyles } from 'react-jss';
import { transitions } from 'polished';

import { Theme } from 'src/common';

export const useStakingSwopFiStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: 24,
      minHeight: 400,
      position: 'relative',
      boxShadow: `0px 0px 0px 1px ${theme.colors.primary}`,
      ...transitions('box-shadow .3s ease-in-out'),

      [theme.mixins.hover()]: {
        '&:hover': {
          boxShadow: `0px 0px 0px 2px ${theme.colors.primary}`,
          opacity: 1
        }
      }
    },

    title: {
      marginBottom: 40
    },

    icon: {
      marginBottom: 12
    }
  }),
  {
    name: 'StakingSwopFi'
  }
);
