import { createUseStyles } from 'react-jss';

export const useContractListStyles = createUseStyles(
  {
    root: {
      listStyleType: 'none',
      padding: 0,
      margin: '0 auto',
      maxWidth: 600
    }
  },
  {
    name: 'ContractList'
  }
);
