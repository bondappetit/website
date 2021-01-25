import React from 'react';

import { Typography } from '../typography';
import { useMarkdownParagraphStyles } from './markdown-paragraph.styles';

export const MarkdownParagraph: React.FC = (props) => {
  const classes = useMarkdownParagraphStyles();

  return (
    <Typography variant="body1" className={classes.root}>
      {props.children}
    </Typography>
  );
};
