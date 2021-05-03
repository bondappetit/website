import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useChangeNetworkModalStyles = createUseStyles(
  (theme: Theme) => ({
    modal: {
      '& div:nth-child(2)': {
        paddingBottom: 0
      }
    },

    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },

    title: {
      marginTop: 'auto',

      [theme.breakpoints.md()]: {
        fontSize: 20,
        lineHeight: '28px'
      }
    },

    img: {
      marginTop: 'auto',
      maxWidth: '100%'
    }
  }),
  {
    name: 'ChangeNetworkModal'
  }
);
