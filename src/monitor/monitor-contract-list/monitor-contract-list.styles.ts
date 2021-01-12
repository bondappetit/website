import { createUseStyles } from 'react-jss';

export const useMonitorContractListStyles = createUseStyles(
  {
    root: {
      margin: '0 auto',
      padding: '64px 16px',
      maxWidth: 800
    },

    list: {
      padding: 0,
      margin: 0,
      listStyleType: 'none'
    },

    investStaking: {
      margin: '20px 0'
    }
  },
  {
    name: 'MonitorContractList'
  }
);
