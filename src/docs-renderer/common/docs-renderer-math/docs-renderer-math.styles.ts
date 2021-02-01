import { createUseStyles } from 'react-jss';

export const useDocsRendererMathStyles = createUseStyles(
  {
    root: {
      maxWidth: '100vw',
      overflow: 'hidden'
    },

    inlineBlock: {
      display: 'inline-block'
    }
  },
  {
    name: 'DocsRendererMath'
  }
);
