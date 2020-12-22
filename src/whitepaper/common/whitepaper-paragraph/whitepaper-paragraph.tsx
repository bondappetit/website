import React from 'react';

import { Typography } from 'src/common';
import { useWhitepaperParagraphStyles } from './whitepaper-paragraph.styles';

export type WhitepaperParagraphProps = unknown;

export const WhitepaperParagraph: React.FC<WhitepaperParagraphProps> = (
  props
) => {
  const classes = useWhitepaperParagraphStyles();

  return (
    <Typography variant="h5" className={classes.root} component="p">
      {props.children}
    </Typography>
  );
};
