import clsx from 'clsx';
import React from 'react';

import { Typography } from 'src/common';
import { useStablecoinTitleStyles } from './stablecoin-title.styles';

export type StablecoinTitleProps = {
  bold: string;
  text: React.ReactNode;
  className?: string;
};

export const StablecoinTitle: React.VFC<StablecoinTitleProps> = (props) => {
  const classes = useStablecoinTitleStyles();

  return (
    <Typography
      variant="h3"
      className={clsx(classes.root, props.className)}
      component="div"
    >
      <Typography variant="inherit" weight="bold" component="div">
        {props.bold}
      </Typography>{' '}
      {props.text}
    </Typography>
  );
};
