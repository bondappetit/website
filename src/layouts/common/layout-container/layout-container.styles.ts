import { createUseStyles } from 'react-jss';

export const useLayoutContainerStyles = createUseStyles(
  {
    container: {
      flex: '1 0 auto',
      display: 'flex',
      flexDirection: 'column'
    }
  },
  {
    name: 'LayoutContainer'
  }
);
