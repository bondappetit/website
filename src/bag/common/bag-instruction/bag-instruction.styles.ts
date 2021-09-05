import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useBagInstructionStyles = createUseStyles(
  (theme: Theme) => ({
    instruction: {
      display: 'grid',
      gridGap: 20,

      [theme.breakpoints.lg()]: {
        gridGap: 40,
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
      }
    },

    instructionCard: {
      padding: '32px 16px',

      [theme.breakpoints.lg()]: {
        padding: '56px 56px 68px'
      }
    },

    instructionCardList: {
      margin: 0,
      listStyleType: 'none',
      padding: 0
    },

    instructionCardListItem: {
      display: 'flex',

      '&:before': {
        content: '"- "',
        marginRight: 8,

        [theme.breakpoints.lg()]: {
          marginRight: 4,
          marginLeft: -12
        }
      }
    },

    instructionCardTitle: {
      marginBottom: 8
    },

    instructionCardListText: {
      [theme.breakpoints.down(1279)]: {
        fontSize: 14,
        lineHeight: '20px'
      }
    },

    icon: {
      marginBottom: 16,
      width: 100,
      height: 60,

      [theme.breakpoints.md()]: {
        width: 200,
        height: 120
      }
    }
  }),
  {
    name: 'BagInstruction'
  }
);
