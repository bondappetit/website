import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { useMainCollateralCardStyles } from './main-collateral-card.styles';

export type MainCollateralCardProps = {
  className?: string;
  id: string;
};

export const MainCollateralCard: React.FC<MainCollateralCardProps> = (
  props
) => {
  const classes = useMainCollateralCardStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography variant="body1" className={classes.content}>
        {props.children}
      </Typography>
      <Typography variant="body1">
        <Link
          color="blue"
          component={ReactRouterLink}
          to={`${URLS.whitepaper}#${props.id}`}
        >
          learn more
        </Link>
      </Typography>
    </div>
  );
};
