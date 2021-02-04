/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { useTheme } from 'react-jss';

import { MarkdownImage, MarkdownImageProps, Theme } from 'src/common';
import { useDocsRendererImageStyles } from './docs-renderer-image.styles';

export const DocsRendererImage: React.VFC<MarkdownImageProps> = (props) => {
  const classes = useDocsRendererImageStyles();

  const theme = useTheme<Theme>();

  return (
    <MarkdownImage
      className={classes.root}
      alt={props.alt}
      src={require(`../../../assets/images/whitepaper/${props.src}-${theme.currentTheme}.png`)}
    />
  );
};
