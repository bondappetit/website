import { createUseStyles } from 'react-jss';

type Props = { width: number; height: number };

export const useLoaderStyles = createUseStyles(
  {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: (props: Props) => props.width,
      height: (props: Props) => props.height,
      color: 'inherit'
    }
  },
  {
    name: 'Loader'
  }
);
