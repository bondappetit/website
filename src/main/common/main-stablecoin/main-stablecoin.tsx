import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Button, Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { useMainStablecoinStyles } from './main-stablecoin.styles';

export type MainStablecoinProps = {
  className?: string;
  onBuy: () => void;
  onSell: () => void;
};

export const MainStablecoin: React.FC<MainStablecoinProps> = (props) => {
  const classes = useMainStablecoinStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div>
        <Typography variant="h4" align="center" className={classes.title}>
          In the foundation of the protocol lies the USDp — first-ever
          decentralized stablecoin based on real-world assets.
        </Typography>
        <Typography variant="h2" align="center" className={classes.total}>
          64,840,720 USDp
        </Typography>
        <div className={classes.actions}>
          <Button className={classes.button} onClick={props.onBuy}>
            Buy
          </Button>
          <Button className={classes.button} onClick={props.onSell}>
            Sell
          </Button>
        </div>
        <Typography variant="h4" align="center">
          <Link component={ReactRouterLink} to={URLS.stablecoin} color="blue">
            Explore Stablecoin →
          </Link>
        </Typography>
      </div>
    </div>
  );
};
