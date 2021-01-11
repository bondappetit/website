import { createUseStyles } from 'react-jss';
import { transitions } from 'polished';

import { Theme } from '../theme';

export const useAccordionStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      borderTop: `dotted 1px ${theme.colors.primary}`,
      overflow: 'hidden',

      '&:last-child': {
        borderBottom: `dotted 1px ${theme.colors.primary}`
      },

      ...transitions('height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms')
    },

    hided: {
      height: 0
    },

    summary: {
      cursor: 'pointer',
      userSelect: 'none',
      padding: '16px 0 16px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '& *:first-child': {
        flexBasis: '95%'
      }
    },

    details: {
      padding: '16px 0 40px 0',

      '& p:not(:last-child)': {
        marginBottom: 30
      }
    },

    arrow: {
      ...transitions('transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms')
    },

    arrowExpanded: {
      transform: 'rotate(180deg)'
    }
  }),
  {
    name: 'Accordion'
  }
);
