import React from 'react';

import { Typography } from 'src/common';
import { useDocsRendererParagraphStyles } from './docs-renderer-paragraph.styles';

export const DocsRendererParagraph: React.FC = (props) => {
  const classes = useDocsRendererParagraphStyles();

  return (
    <Typography variant="h5" className={classes.root} component="p">
      {props.children}
    </Typography>
  );
};
