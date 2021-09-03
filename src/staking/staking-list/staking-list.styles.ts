import { rgba, transitions } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStakingListStyles = createUseStyles(
  (theme: Theme) => ({
    header: {
      marginBottom: 24,

      [theme.breakpoints.lg()]: {
        marginBottom: 48
      }
    },

    titleWrap: {
      maxWidth: 872,
      marginBottom: 40
    },

    title: {
      marginBottom: 24
    },

    staking: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 40,
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(416px, 1fr))'
      },

      [theme.breakpoints.lg()]: {
        gridGap: 48,
        marginBottom: 48
      }
    },

    showMore: {
      color: rgba(theme.colors.primary, 0.4),
      fontSize: 20,
      lineHeight: '28px',
      justifyContent: 'flex-start'
    },

    cardWrap: {
      color: 'inherit',
      textDecoration: 'none'
    },

    card: {
      padding: 40,
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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

    mb4: {
      marginBottom: 4
    },

    mb40: {
      marginBottom: 40
    },

    mb160: {
      marginBottom: 160
    },

    staked: {
      position: 'absolute',
      top: 12,
      left: 12,
      padding: '0px 8px',
      borderRadius: 100,
      color: `${theme.colors.black} !important`
    }
  }),
  {
    name: 'StakingList'
  }
);
