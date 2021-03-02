import { createUseStyles } from 'react-jss';
import { rgba } from 'polished';

import { Theme } from 'src/common';

export const useFormModalStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },

    inputs: {
      margin: ['auto', 0]
    },

    row: {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',

      '&:not(:last-child)': {
        marginBottom: 56
      }
    },

    reward: {
      position: 'absolute',
      top: '100%',
      left: 0,
      background: theme.colors.yellow,
      color: theme.colors.black,
      padding: '4px 9px',
      borderRadius: 12
    },

    input: {
      fontSize: 32,
      lineHeight: '40px',
      width: '50%',
      display: 'flex',
      flexDirection: 'column',

      '&:first-child': {
        alignItems: 'flex-start'
      },

      '&:last-child': {
        alignItems: 'flex-end'
      }
    },

    selectButton: {
      padding: [4, 8],
      margin: [-4, -8],
      borderRadius: 8,

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1,
          backgroundColor: rgba(theme.colors.primary, 0.08)
        }
      }
    },

    select: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },

    selectOption: {
      fontSize: 24,
      lineHeight: '32px',
      justifyContent: 'space-between',
      padding: [8, 16],
      margin: [0, -16],
      borderRadius: 8,

      [theme.mixins.hover()]: {
        '&:hover': {
          opacity: 1,
          backgroundColor: rgba(theme.colors.primary, 0.08)
        }
      }
    },

    selectOptionActive: {
      opacity: 0.4,
      pointerEvents: 'none'
    },

    hint: {
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    hintButton: {
      marginLeft: 5
    },

    tippy: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      padding: 16,
      borderRadius: 16,
      transition: 'none'
    }
  }),
  {
    name: 'FormModal'
  }
);
