import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useCollateralPhasesStyles = createUseStyles(
  (theme: Theme) => ({
    phases: {
      padding: '32px 24px',

      [theme.breakpoints.md()]: {
        padding: '80px 104px'
      }
    },

    phaseCard: {
      gridTemplateColumns: '80px 1fr',
      gridGap: 116,

      '&:not(:last-child)': {
        marginBottom: 64,

        [theme.breakpoints.md()]: {
          marginBottom: 48
        }
      },

      [theme.breakpoints.md()]: {
        display: 'grid'
      },

      [theme.breakpoints.lg()]: {
        gridGap: 231
      }
    },

    phaseCardTitle: {
      fontWeight: 600,
      marginBottom: 8,

      [theme.breakpoints.md()]: {
        fontWeight: 400,
        marginBottom: 0
      }
    },

    phaseCardBody: {
      marginBottom: 8,

      [theme.breakpoints.md()]: {
        marginBottom: 0
      }
    }
  }),
  {
    name: 'CollateralPhases'
  }
);
