import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Button, Typography, Link, Skeleton } from 'src/common';
import { URLS } from 'src/router/urls';
import { useMainStablecoinStyles } from './main-stablecoin.styles';

export type MainStablecoinProps = {
  className?: string;
  onBuy: () => void;
  onSell: () => void;
  stablecoinBalance: string;
};

export const MainStablecoin: React.FC<MainStablecoinProps> = (props) => {
  const classes = useMainStablecoinStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div>
        <Typography variant="h2" align="center" className={classes.total}>
          {!props.stablecoinBalance && <Skeleton />}
          {props.stablecoinBalance && <>{props.stablecoinBalance} USDap</>}
        </Typography>
        <div className={classes.actions}>
          <Button className={classes.button} onClick={props.onBuy}>
            Buy
          </Button>
          <Button className={classes.button} onClick={props.onSell}>
            Sell
          </Button>
        </div>
        <Typography variant="h4" align="center" className={classes.title}>
          USDap — the first-ever decentralized stablecoin based on real-world
          assets (bonds), lies at the heart of the protocol
        </Typography>
        <Typography variant="h4" align="center">
          <Link component={ReactRouterLink} to={URLS.stablecoin} color="blue">
            Explore Stablecoin →
          </Link>
        </Typography>
      </div>
    </div>
  );
};
