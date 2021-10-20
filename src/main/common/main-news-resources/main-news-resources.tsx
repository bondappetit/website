import clsx from 'clsx';
import React from 'react';

import bitCourier from 'src/assets/images/news-resources/bit-courier.png';
import coinpedia from 'src/assets/images/news-resources/coinpedia.png';
import cointelegraph from 'src/assets/images/news-resources/cointelegraph.png';
import hackernoon from 'src/assets/images/news-resources/hackernoon.png';
import ibt from 'src/assets/images/news-resources/ibt.png';
import newsBTC from 'src/assets/images/news-resources/news-btc.png';
import yahooFinance from 'src/assets/images/news-resources/yahoo-finance.png';
import { Link } from 'src/common';
import { useMainNewsResourcesStyles } from './main-news-resources.styles';

export type MainNewsResourcesProps = {
  className?: string;
};

const RESOURCES = [
  {
    src: cointelegraph,
    link: 'https://cointelegraph.com/authors/artem-tolkachev'
  },
  {
    src: ibt,
    link: 'https://www.ibtimes.com/8-cryptocurrency-defi-projects-watch-may-3184490'
  },
  {
    src: yahooFinance,
    link: 'https://finance.yahoo.com/news/investors-now-stablecoins-beat-market-142108604.html'
  },
  {
    src: coinpedia,
    link: 'https://coinpedia.org/guest-post/staking-in-defi-liquidity-pools/'
  },
  {
    src: newsBTC,
    link: 'https://www.newsbtc.com/news/company/stablecoins-are-changing-and-its-a-big-deal/'
  },
  {
    src: hackernoon,
    link: 'https://hackernoon.com/top-15-small-cap-defi-projects-to-keep-your-eye-on-in-2021'
  },
  {
    src: bitCourier,
    link: 'https://bitcourier.co.uk/news/bond-appetit'
  }
];

export const MainNewsResources: React.VFC<MainNewsResourcesProps> = (props) => {
  const classes = useMainNewsResourcesStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      {RESOURCES.map((resource) => (
        <Link
          key={resource.src}
          href={resource.link}
          target="_blank"
          className={classes.item}
        >
          <img src={resource.src} alt="" className={classes.img} />
        </Link>
      ))}
    </div>
  );
};
