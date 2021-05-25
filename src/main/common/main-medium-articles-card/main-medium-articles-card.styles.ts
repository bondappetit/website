import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainMediumArticlesCardStyles = createUseStyles(
  (theme: Theme) => ({
    article: {
      opacity: 1,
      display: 'block',

      '&:not(:last-child)': {
        marginBottom: 24
      }
    },

    title: {
      marginBottom: 8
    },

    date: {
      color: rgba(theme.colors.primary, 0.4)
    }
  }),
  {
    name: 'MainMediumArticlesCard'
  }
);
