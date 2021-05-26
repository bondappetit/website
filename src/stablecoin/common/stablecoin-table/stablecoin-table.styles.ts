import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinTableStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    title: {
      marginBottom: 48
    },

    headTitle: {
      whiteSpace: 'pre'
    },

    icon: {
      '--fill': theme.colors.secondary,
      width: 32,
      height: 32,
      margin: 'auto'
    },

    coin: {
      width: 24,
      height: 24,
      marginRight: 8
    },

    coinTitle: {
      opacity: 0.4,
      marginLeft: 8
    },

    table: {
      background: theme.colors.proposalPlate,
      borderRadius: 24
    },

    tableRow: {
      borderColor: rgba(theme.colors.primary, 0.16),
      borderBottomStyle: 'solid',

      '& *': {
        verticalAlign: 'middle'
      },

      '&:first-child': {
        borderColor: rgba(theme.colors.primary, 0.16)
      },

      '& > *:nth-last-child(-n+3)': {
        width: 200
      },

      '& > *:first-child': {
        borderRight: `1px solid ${rgba(theme.colors.primary, 0.16)}`,
        paddingLeft: 40
      },

      '& > *:nth-child(2)': {
        paddingLeft: 78,
        paddingRight: 0
      }
    },

    tableCell: {
      display: 'flex',
      whiteSpace: 'nowrap'
    },

    borderTopNone: {
      '&:first-child': {
        borderTop: 'none'
      }
    },

    borderBottomNone: {
      '&:last-child': {
        borderBottom: 'none'
      }
    }
  }),
  {
    name: 'StablecoinTable'
  }
);
