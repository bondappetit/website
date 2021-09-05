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
    <div className={clsx(classes.root, props.className)}>
      <Typography variant="h2" component="div" className={classes.bold}>
        {props.bold}
      </Typography>{' '}
      <Typography variant="h5" component="div">
        {props.text}
      </Typography>
    </div>
  );
};
