import React from 'react';

import { Typography } from '../typography';
import { useMarkdownHeadingStyles } from './markdown-heading.styles';

export type MarkdownHeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

type Variants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const MarkdownHeading: React.FC<MarkdownHeadingProps> = (props) => {
  const classes = useMarkdownHeadingStyles();

  const variant = `h${props.level}` as Variants;

  return (
    <Typography variant={variant} className={classes.root}>
      {props.children}
    </Typography>
  );
};
