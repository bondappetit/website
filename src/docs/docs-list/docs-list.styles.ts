import { createUseStyles } from 'react-jss';

export const useDocsListStyles = createUseStyles(
  {
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },

    listItem: {
      marginBottom: 16
    }
  },
  {
    name: 'DocsList'
  }
);
