import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { useBagTitleStyles } from './bag-title.styles';

export type BagTitleProps = {
  title: string;
  text: React.ReactNode;
  className?: string;
};

export const BagTitle: React.VFC<BagTitleProps> = (props) => {
  const classes = useBagTitleStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography variant="h2" className={classes.title}>
        {props.title}
      </Typography>
      <Typography variant="h5" component="p">
        {props.text}
      </Typography>
    </div>
  );
};
