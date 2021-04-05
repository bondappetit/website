import { createUseStyles } from 'react-jss';

import { Theme } from '../theme';

export const useCarouselStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      marginLeft: -16,
      marginRight: -16
    },

    slide: {
      padding: '1px 8px'
    },

    dots: {
      listStyle: 'none',
      margin: [16, 0, 0],
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '& .slick-active $dot': {
        backgroundColor: theme.colors.primary
      }
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      border: `1px solid ${theme.colors.primary}`,
      margin: [0, 4]
    }
  }),
  {
    name: 'Carousel'
  }
);
