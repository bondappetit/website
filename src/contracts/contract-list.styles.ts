import { createUseStyles } from 'react-jss';

export const useContractListStyles = createUseStyles(
  {
    root: {
      margin: '0 auto',
      maxWidth: 600
    },

    list: {
      listStyleType: 'none',
      padding: 0,
      margin: '0 0 30px'
    }
  },
  {
    name: 'ContractList'
  }
);
