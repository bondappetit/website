import React from 'react';

import { useMarkdownImageStyles } from './markdown-image.styles';

export type MarkdownImageProps = {
  alt: string;
  src: string;
};

export const MarkdownImage: React.FC<MarkdownImageProps> = (props) => {
  const classes = useMarkdownImageStyles();

  return (
    <img
      alt={props.alt}
      src={props.src}
      loading="lazy"
      className={classes.root}
    />
  );
};
