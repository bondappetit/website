import React from 'react';

import { Link, Plate, Typography } from 'src/common';
import { ReactComponent as CointelegraphIcon } from 'src/assets/icons/cointelegraph.svg';
import { useMainCointelegraphStyles } from './main-cointelegraph.styles';

export type MainCointelegraphProps = {
  test?: string;
};

const ARTICLES = [
  {
    title:
      'A nightmare on Stable Street: Centralized stablecoins may be doomed',
    date: 'Apr 18, 2021',
    author: 'Artem Tolkachev',
    link: 'https://cointelegraph.com/news/a-nightmare-on-stable-street-centralized-stablecoins-may-be-doomed'
  },
  {
    title: 'Why DeFi plus asset tokenization will take crypto to new heights',
    date: 'Jan 17, 2021',
    author: 'Artem Tolkachev',
    link: 'https://cointelegraph.com/news/why-defi-plus-asset-tokenization-will-take-crypto-to-new-heights'
  }
];

export const MainCointelegraph: React.VFC<MainCointelegraphProps> = () => {
  const classes = useMainCointelegraphStyles();

  return (
    <div>
      {ARTICLES.map((article) => (
        <Link
          key={article.title}
          className={classes.card}
          href={article.link}
          target="_blank"
        >
          <Plate className={classes.cardContent}>
            <div className={classes.cardHeader}>
              <CointelegraphIcon className={classes.cardIcon} />
              <Typography variant="body1">Cointelegraph</Typography>
            </div>
            <Typography variant="h4" className={classes.cardTitle}>
              {article.title}
            </Typography>
            <Typography variant="body1" className={classes.cardSubtitle}>
              {article.author}, {article.date}
            </Typography>
          </Plate>
        </Link>
      ))}
    </div>
  );
};
