import clsx from 'clsx';
import React from 'react';

import { Typography, Link } from 'src/common';
import { useMainCollateralCardStyles } from './main-collateral-card.styles';

export type MainCollateralCardProps = {
  className?: string;
};

export const MainCollateralCard: React.FC<MainCollateralCardProps> = (
  props
) => {
  const classes = useMainCollateralCardStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.content}>{props.children}</div>
      <Typography variant="h4">
        <Link href="#more" color="blue">
          learn more
        </Link>
      </Typography>
    </div>
  );
};
