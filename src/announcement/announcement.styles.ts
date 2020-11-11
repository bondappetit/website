import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useAnnouncementStyles = createUseStyles((theme: Theme) => ({
  announcement: {
    maxWidth: 1004,
    width: '100%',
    padding: 32
  },

  decoratedText: {
    position: 'relative',
    zIndex: 1,
    whiteSpace: 'nowrap'
  },

  textRound: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: 0,
    zIndex: -1,
    maxWidth: '112%',

    [theme.breakpoints.md()]: {
      top: -8,
      left: -8,
      right: -8
    }
  },

  tokenTitleLine: {
    stroke: theme.colors.tokenTitleLine,
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: -1
  }
}));
