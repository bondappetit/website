import React from 'react';
import clsx from 'clsx';

import { ScrollIntoView, Typography } from 'src/common';
import { useStablecoinHeaderStyles } from './stablecoin-header.styles';

const LINKS = [
  {
    title: 'Get USDap',
    url: '#usdap'
  },
  {
    title: 'Features',
    url: '#features'
  },
  {
    title: 'Compare',
    url: '#compare'
  },
  {
    title: 'Collateral',
    url: '#collateral'
  },
  {
    title: 'FAQ',
    url: '#faq'
  }
];

export type StablecoinHeaderProps = {
  className?: string;
};

export const StablecoinHeader: React.VFC<StablecoinHeaderProps> = (props) => {
  const classes = useStablecoinHeaderStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.titleWrap}>
        <Typography variant="h1" className={classes.title}>
          The first decentralized stablecoin backed by yield-generating bonds
        </Typography>
        <ul className={classes.links}>
          {LINKS.map((link) => (
            <li key={link.title} className={classes.linksItem}>
              <Typography variant="h5">
                <ScrollIntoView target={link.url}>{link.title}</ScrollIntoView>
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
