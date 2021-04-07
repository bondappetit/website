import React from 'react';

import { Link, Plate, Typography } from 'src/common';
import { ReactComponent as CointelegraphIcon } from 'src/assets/icons/cointelegraph.svg';
import { useMainCointelegraphStyles } from './main-cointelegraph.styles';

export type MainCointelegraphProps = {
  test?: string;
};

const ARTICLES = [
  {
    title: 'Why DeFi plus asset tokenization will take crypto to new heights',
    date: 'Jan 17, 2021',
    author: 'Artem Tolkachev',
    link:
      'https://cointelegraph.com/news/why-defi-plus-asset-tokenization-will-take-crypto-to-new-heights'
  },
  {
    title:
      'The DeFi market desperately needs to connect with real-world assets',
    date: 'Nov 14, 2020',
    author: 'Artem Tolkachev',
    link:
      'https://cointelegraph.com/news/the-defi-market-desperately-needs-to-connect-with-real-world-assets'
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
              <Typography variant="h4" className={classes.cardSite}>
                Cointelegraph
              </Typography>
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
