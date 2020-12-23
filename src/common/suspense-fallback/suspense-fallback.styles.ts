import { createUseStyles } from 'react-jss';

export const useSuspenseFallbackStyles = createUseStyles(
  {
    root: {
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  {
    name: 'SuspenseFallback'
  }
);
