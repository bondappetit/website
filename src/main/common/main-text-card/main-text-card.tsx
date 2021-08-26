import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { useMainTextCardStyles } from './main-text-card.styles';

export type MainTextCardProps = {
  className?: string;
};

export const MainTextCard: React.FC<MainTextCardProps> = (props) => {
  const classes = useMainTextCardStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography variant="body1" className={classes.content}>
        {props.children}
      </Typography>
    </div>
  );
};
