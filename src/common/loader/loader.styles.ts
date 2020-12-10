import { createUseStyles } from 'react-jss';

export const useLoaderStyles = createUseStyles(
  {
    root: {
      display: 'inline-block',
      position: 'relative',
      width: (props: { width: number }) => props.width,
      height: (props: { height: number }) => props.height,

      '& div': {
        boxSizing: 'border-box',
        display: 'block',
        position: 'absolute',
        width: (props: { width: number }) => props.width - 16,
        height: (props: { height: number }) => props.height - 16,
        margin: 8,
        border: `8px solid currentColor`,
        borderRadius: '50%',
        animation: '$loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        borderColor: `currentColor transparent transparent transparent`
      },

      '& div:nth-child(1)': {
        animationDelay: '-0.45s'
      },

      '& div:nth-child(2)': {
        animationDelay: '-0.3s'
      },

      '& div:nth-child(3)': {
        animationDelay: '-0.15s'
      }
    },

    '@keyframes loader': {
      from: {
        transform: 'rotate(0deg)'
      },

      to: {
        transform: 'rotate(360deg)'
      }
    }
  },
  {
    name: 'Loader'
  }
);
