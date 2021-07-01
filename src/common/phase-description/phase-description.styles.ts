import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common/theme';

export const usePhaseDescriptionStyles = createUseStyles(
  {
    root: {
      padding: '40px 24px'
    },

    text: {
      opacity: 0.64
    }
  },
  {
    name: 'PhaseDescription'
  }
);
