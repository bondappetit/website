import React from 'react';

import { Link } from '../link';
import { useMarkdownLinkStyles } from './markdown-link.styles';

export type MarkdownLinkProps = {
  href: string;
};

export const MarkdownLink: React.FC<MarkdownLinkProps> = (props) => {
  const classes = useMarkdownLinkStyles();

  return (
    <Link href={props.href} className={classes.root} color="blue">
      {props.children}
    </Link>
  );
};
