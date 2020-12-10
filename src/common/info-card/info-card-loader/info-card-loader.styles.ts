import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common/theme';

export const useInfoCardLoaderStyles = createUseStyles(
  (theme: Theme) => ({
    process: {
      position: 'absolute',
      top: 4,
      bottom: 0,
      left: 0,
      zIndex: -1,
      backgroundColor: theme.colors.yellow,
      opacity: (props: { isFinished: boolean }) => (props.isFinished ? 0 : 1),
      transition: `opacity 300ms linear`
    }
  }),
  {
    name: 'InfoCardLoader'
  }
);
