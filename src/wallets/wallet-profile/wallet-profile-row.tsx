import clsx from 'clsx';
import React from 'react';

import { Typography, Skeleton } from 'src/common';
import { useWalletProfileStyles } from './wallet-profile.styles';

export type WalletProfileRowProps = {
  className?: string;
  title?: React.ReactNode;
  valueInBag?: React.ReactNode;
  valueInUSD?: React.ReactNode;
  loading?: boolean;
};

export const WalletProfileRow: React.VFC<WalletProfileRowProps> = (props) => {
  const classes = useWalletProfileStyles();

  return (
    <div className={props.className}>
      <Typography variant="body1" className={clsx(classes.col, classes.col35)}>
        {props.loading ? (
          <Skeleton className={classes.skeleton} />
        ) : (
          props.title
        )}
      </Typography>
      <Typography
        variant="body1"
        align="right"
        className={clsx(classes.col, classes.col35)}
      >
        {props.loading ? (
          <Skeleton className={classes.skeleton} />
        ) : (
          <>{props.valueInBag} BAG</>
        )}
      </Typography>
      <Typography
        variant="body1"
        align="right"
        className={clsx(classes.col, classes.col30)}
      >
        {props.loading ? (
          <Skeleton className={classes.skeleton} />
        ) : (
          <>${props.valueInUSD}</>
        )}
      </Typography>
    </div>
  );
};
