import clsx from 'clsx';
import React from 'react';

import { Plate } from 'src/common';
import { useCollateralCardStyles } from './collateral-card.styles';

export type CollateralCardProps = {
  head: React.ReactNode;
  body: React.ReactNode;
  className?: string;
};

export const CollateralCard: React.FC<CollateralCardProps> = (props) => {
  const classes = useCollateralCardStyles();

  return (
    <Plate variant="dotted" className={clsx(classes.root, props.className)}>
      {props.head}
      <div className={classes.body}>{props.body}</div>
    </Plate>
  );
};
