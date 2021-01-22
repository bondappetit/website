import { createUseStyles } from 'react-jss';

export const useInvestingSuccessSubscribeStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center'
    },

    text: {
      margin: 'auto',
      maxWidth: 400
    }
  },
  {
    name: 'InvestingSuccessSubscribe'
  }
);
