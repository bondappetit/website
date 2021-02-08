import { createUseStyles } from 'react-jss';

export const useLoaderStyles = createUseStyles(
  {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: (props: { width: number }) => props.width,
      height: (props: { height: number }) => props.height
    }
  },
  {
    name: 'Loader'
  }
);
