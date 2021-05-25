import React from 'react';

import { Link, numberArray, Plate, Typography } from 'src/common';
import { Article } from 'src/common/use-medium-article-list';
import { ReactComponent as BlogIcon } from 'src/assets/icons/blog.svg';
import { useMainMediumArticlesStyles } from './main-medium-articles.styles';
import { MainMediumArticlesCard } from '../main-medium-articles-card/main-medium-articles-card';

const BLOG_URL = 'https://medium.com/bondappetit';

export type MainMediumArticlesProps = {
  articles?: Article[];
  loading: boolean;
};

export const MainMediumArticles: React.VFC<MainMediumArticlesProps> = (
  props
) => {
  const classes = useMainMediumArticlesStyles();

  return (
    <Plate className={classes.root}>
      <div className={classes.header}>
        <BlogIcon className={classes.icon} />
        <Typography variant="body1" className={classes.title}>
          Latest on{' '}
          <Link color="blue" href={BLOG_URL} target="_blank">
            @bondappetit
          </Link>{' '}
          blog:
        </Typography>
      </div>
      {props.loading
        ? numberArray(3).map((num) => (
            <MainMediumArticlesCard key={num} loading={props.loading} />
          ))
        : props.articles?.map((article) => (
            <MainMediumArticlesCard key={article.guid} {...article} />
          ))}
    </Plate>
  );
};
