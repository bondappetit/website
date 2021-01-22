import { createUseStyles } from 'react-jss';

export const useInvestingSubscribeFormStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },

    inner: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto 0'
    },

    modalButton: {
      fontSize: 32,
      lineHeight: '40px',
      paddingTop: 4,
      paddingBottom: 4
    },

    input: {
      margin: 0,
      fontSize: 20,
      lineHeight: '28px',
      height: 28
    }
  },
  {
    name: 'InvestingSubscribeForm'
  }
);
