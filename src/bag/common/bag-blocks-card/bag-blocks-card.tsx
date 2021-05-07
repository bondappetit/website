import clsx from 'clsx';
import React from 'react';

import { Button, Plate, Typography } from 'src/common';
import { useBagBlocksCardStyles } from './bag-blocks-card.styles';

export type BagBlocksCardProps = {
  icons: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  percent?: string;
  button?: string;
  onClick?: () => void;
};

export const BagBlocksCard: React.VFC<BagBlocksCardProps> = (props) => {
  const classes = useBagBlocksCardStyles({
    percent: Number(props.percent)
  });

  return (
    <Plate className={classes.root}>
      <Typography
        variant="h4"
        align="center"
        className={clsx(!props.subtitle && classes.title)}
      >
        {props.title}
      </Typography>
      {props.percent && <div className={classes.progress} />}
      {props.subtitle && (
        <Typography variant="body2" component="div" className={classes.title}>
          {props.subtitle}
        </Typography>
      )}
      <div className={classes.icons}>{props.icons}</div>
      <Button className={classes.button} onClick={props.onClick}>
        {props.button}
      </Button>
    </Plate>
  );
};
