import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { useBagTitleStyles } from './bag-title.styles';

export type BagTitleProps = {
  bold: string;
  text: React.ReactNode;
  className?: string;
};

export const BagTitle: React.VFC<BagTitleProps> = (props) => {
  const classes = useBagTitleStyles();

  return (
    <Typography
      variant="h3"
      className={clsx(classes.root, props.className)}
      component="div"
    >
      <Typography variant="inherit" weight="semibold" component="div">
        {props.bold}
      </Typography>{' '}
      {props.text}
    </Typography>
  );
};
