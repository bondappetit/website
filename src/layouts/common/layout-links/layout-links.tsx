import clsx from 'clsx';
import React from 'react';

import { Typography, Link } from 'src/common';
import { useLayoutLinksStyles } from './layout-links.styles';
import { SOCIAL_LINKS } from '../constants';

export type LayoutLinksProps = {
  className?: string;
};

export const LayoutLinks: React.FC<LayoutLinksProps> = (props) => {
  const classes = useLayoutLinksStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      {SOCIAL_LINKS.map((link) => (
        <Link
          href={link.link}
          key={link.title}
          target="_blank"
          className={classes.link}
        >
          <link.icon className={classes.linkIcon} />
          <Typography
            variant="body1"
            component="span"
            className={classes.linkTitle}
          >
            {link.title}
          </Typography>
        </Link>
      ))}
    </div>
  );
};
