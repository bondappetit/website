import React from 'react';
import clsx from 'clsx';

import { ScrollIntoView, Typography } from 'src/common';
import { ReactComponent as CoinIcon } from 'src/assets/images/big-usdap.svg';
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
          Decentralized stablecoin based on real-world assets
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
      <CoinIcon className={classes.coin} />
    </div>
  );
};
