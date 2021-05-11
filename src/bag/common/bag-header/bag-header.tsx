import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import clsx from 'clsx';

import { Link, ScrollIntoView, Typography } from 'src/common';
import { ReactComponent as CoinIcon } from 'src/assets/images/coin.svg';
import { URLS } from 'src/router/urls';
import { useBagHeaderStyles } from './bag-header.styles';

const LINKS = [
  {
    title: 'Get BAG',
    url: URLS.staking.list
  },
  {
    title: 'Coupon Rewards',
    url: `${URLS.whitepaper}`
  },
  {
    title: 'Governance',
    url: URLS.voting.info
  },
  {
    title: 'Distribution',
    url: `${URLS.whitepaper}`
  },
  {
    title: 'Invest',
    url: URLS.voting.info
  },
  {
    title: 'FAQ',
    url: '#faq',
    scroll: true
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
                {link.scroll ? (
                  <ScrollIntoView target={link.url}>
                    {link.title}
                  </ScrollIntoView>
                ) : (
                  <Link component={ReactRouterLink} to={link.url}>
                    {link.title}
                  </Link>
                )}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <CoinIcon className={classes.coin} />
    </div>
  );
};
