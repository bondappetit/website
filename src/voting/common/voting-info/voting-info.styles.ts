import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      border: `2px solid ${theme.colors.darkGrey}`,
      borderRadius: 16,
      width: '100%',
      padding: '16px 21px',
      backgroundColor: theme.colors.darkGrey,
      position: 'relative'
    },

    active: {
      borderColor: theme.colors.primary
    },

    separator: {
      backgroundColor: 'currentColor',
      height: 4,
      margin: '8px 0',
      borderRadius: 12,
      width: (props: { percentage: number }) =>
        props.percentage === 0 ? '3%' : `${props.percentage}%`
    },

    link: {
      color: theme.colors.darkBlue
    },

    voteFor: {
      color: theme.colors.green
    },

    voteAgainst: {
      color: theme.colors.red
    },

    chip: {
      borderRadius: 12,
      padding: '3px 8px',
      position: 'absolute',
      right: 6,
      top: 6,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary
    },

    checkedIcon: {
      marginRight: 6
    }
  }),
  {
    name: 'VotingInfo'
  }
);
