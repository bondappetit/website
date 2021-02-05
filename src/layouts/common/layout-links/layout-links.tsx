import React from 'react';

import { Typography, Link } from 'src/common';
import { useLayoutLinksStyles } from './layout-links.styles';
import { SOCIAL_LINKS } from '../constants';

export type LayoutLinksProps = {
  className?: string;
};

export const LayoutLinks: React.FC<LayoutLinksProps> = () => {
  const classes = useLayoutLinksStyles();

  return (
    <div className={classes.root}>
      {SOCIAL_LINKS.map((link) => (
        <Link
          href={link.link}
          key={link.title}
          target="_blank"
          className={classes.link}
        >
          <link.icon className={classes.linkIcon} />
          <Typography
            variant="h4"
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
