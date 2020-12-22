import React from 'react';

import { Typography } from '../typography';
import { useMarkdownParagraphStyles } from './markdown-paragraph.styles';

export type MarkdownParagraphProps = unknown;

export const MarkdownParagraph: React.FC<MarkdownParagraphProps> = (props) => {
  const classes = useMarkdownParagraphStyles();

  return (
    <Typography variant="body1" className={classes.root}>
      {props.children}
    </Typography>
  );
};
