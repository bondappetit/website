import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useDocsRendererParagraphStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: 24,
      color: theme.colors.docsParagraph
    }
  }),
  {
    name: 'DocsRendererParagraph'
  }
);
