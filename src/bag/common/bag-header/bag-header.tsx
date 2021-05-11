import React from 'react';
import clsx from 'clsx';

import { ScrollIntoView, Typography } from 'src/common';
import { ReactComponent as CoinIcon } from 'src/assets/images/coin.svg';
import { useBagHeaderStyles } from './bag-header.styles';

const LINKS = [
  {
    title: 'Get BAG',
    url: '#blocks'
  },
  {
    title: 'Coupon Rewards',
    url: '#coupon'
  },
  {
    title: 'Governance',
    url: '#governance'
  },
  {
    title: 'Distribution',
    url: '#distribution'
  },
  {
    title: 'Invest',
    url: '#invest'
  },
  {
    title: 'FAQ',
    url: '#faq'
  }
];

export type BagHeaderProps = {
  className?: string;
};

export const BagHeader: React.VFC<BagHeaderProps> = (props) => {
  const classes = useBagHeaderStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.titleWrap}>
        <Typography variant="h1" className={classes.title}>
          Governance token of the BondAppétit protocol
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
