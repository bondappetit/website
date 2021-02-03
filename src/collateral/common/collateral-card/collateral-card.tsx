import clsx from 'clsx';
import React from 'react';

import { Plate, Typography } from 'src/common';
import { useCollateralCardStyles } from './collateral-card.styles';

export type CollateralCardProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  body: React.ReactNode;
  className?: string;
};

export const CollateralCard: React.FC<CollateralCardProps> = (props) => {
  const classes = useCollateralCardStyles();

  return (
    <Plate className={clsx(classes.root, props.className)}>
      <div className={classes.body}>
        <Typography variant="h5" align="center" className={classes.title}>
          {props.title}
        </Typography>
        <Typography variant="h2" align="center" className={classes.bodyText}>
          {props.body}
        </Typography>
        {props.subtitle && (
          <Typography variant="h5" align="center" className={classes.subtitle}>
            {props.subtitle}
          </Typography>
        )}
      </div>
    </Plate>
  );
};
