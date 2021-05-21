import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Button, Typography, Link, Skeleton, Plate } from 'src/common';
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
      <Typography variant="h2" className={classes.title}>
        At the heart of the protocol lies USDap — the first-ever decentralized
        stablecoin based on real-world assets.{' '}
        <Link
          component={ReactRouterLink}
          to={URLS.stablecoin}
          className={classes.link}
        >
          Explore
        </Link>
      </Typography>
      <div className={classes.grid}>
        <Plate className={classes.card}>
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
        </Plate>
        {props.children}
      </div>
    </div>
  );
};
