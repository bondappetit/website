import React from 'react';

import { Link, Typography, dateUtils, Skeleton } from 'src/common';
import { useMainMediumArticlesCardStyles } from './main-medium-articles-card.styles';

export type MainMediumArticlesCardProps = {
  link?: string;
  pubDate?: string;
  title?: string;
  loading?: boolean;
};

const DATE_FORMAT = 'MMM DD, YYYY';

export const MainMediumArticlesCard: React.VFC<MainMediumArticlesCardProps> = (
  props
) => {
  const classes = useMainMediumArticlesCardStyles();

  return (
    <Link className={classes.article} href={props.link} target="_blank">
      <Typography variant="body1">
        {props.loading ? <Skeleton /> : props.title}
      </Typography>
      <Typography variant="body1" className={classes.date}>
        {props.loading ? (
          <Skeleton />
        ) : (
          dateUtils.format(props.pubDate, DATE_FORMAT)
        )}
      </Typography>
    </Link>
  );
};
