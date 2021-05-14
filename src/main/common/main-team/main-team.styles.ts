import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainTeamStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      width: '100%'
    },

    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'grid',
      gridGap: 20,

      [theme.breakpoints.md()]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(416px, 1fr))',
        gridGap: 40
      }
    },

    teamMember: {
      padding: 24,
      minHeight: '100%',

      [theme.breakpoints.md()]: {
        padding: 40
      }
    },

    teamMemberHeader: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: '80px 1fr',
      gridGap: 16,
      marginBottom: 16,

      [theme.breakpoints.md()]: {
        gridGap: 24,
        marginBottom: 32
      }
    },

    teamMemberPhoto: {
      width: 80,
      height: 80
    },

    teamMemberText: {
      opacity: 0.72
    }
  }),
  {
    name: 'MainTeam'
  }
);
