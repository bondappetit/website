import React from 'react';

import { Link } from '../link';

export type MarkdownLinkProps = {
  href: string;
};

export const MarkdownLink: React.FC<MarkdownLinkProps> = (props) => {
  return (
    <Link href={props.href} color="blue">
      {props.children}
    </Link>
  );
};
