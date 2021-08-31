import clsx from 'clsx';
import React from 'react';

import blockchainNews from 'src/assets/images/news-resources/blockchain-news.png';
import coinpedia from 'src/assets/images/news-resources/coinpedia.png';
import cointelegraph from 'src/assets/images/news-resources/cointelegraph.png';
import hackernoon from 'src/assets/images/news-resources/hackernoon.png';
import ibt from 'src/assets/images/news-resources/ibt.png';
import newsBTC from 'src/assets/images/news-resources/news-btc.png';
import yahooFinance from 'src/assets/images/news-resources/yahoo-finance.png';
import { useMainNewsResourcesStyles } from './main-news-resources.styles';

export type MainNewsResourcesProps = {
  className?: string;
};

const RESOURCES = [
  {
    src: cointelegraph
  },
  {
    src: ibt
  },
  {
    src: yahooFinance
  },
  {
    src: coinpedia
  },
  {
    src: newsBTC
  },
  {
    src: hackernoon
  },
  {
    src: blockchainNews
  }
];

export const MainNewsResources: React.VFC<MainNewsResourcesProps> = (props) => {
  const classes = useMainNewsResourcesStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      {RESOURCES.map((resource) => (
        <div key={resource.src} className={classes.item}>
          <img src={resource.src} alt="" className={classes.img} />
        </div>
      ))}
    </div>
  );
};
