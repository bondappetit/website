import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useVotingInfoProposalListStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      margin: '0 auto 64px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 104px'
      }
    },

    subtitle: {
      maxWidth: 960,
      margin: '0 auto 32px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 48px'
      }
    },

    proposals: {
      marginBottom: 16
    },

    link: {
      width: '100%',
      height: 82,
      fontSize: 16,
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: 16,

      [theme.breakpoints.md()]: {
        borderRadius: 24,
        height: 88,
        fontSize: 20,
        lineHeight: '28px'
      }
    }
  }),
  {
    name: 'VotingInfoProposalList'
  }
);
