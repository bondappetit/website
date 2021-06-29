import clsx from 'clsx';
import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useInterval } from 'react-use';

import {
  Button,
  Typography,
  Link,
  Skeleton,
  Plate,
  ButtonBase,
  dateUtils
} from 'src/common';
import { config } from 'src/config';
import { URLS } from 'src/router/urls';
import { useMainStablecoinStyles } from './main-stablecoin.styles';

export type MainStablecoinProps = {
  className?: string;
  onBuy: () => void;
  onSell: () => void;
  stablecoinBalance: string;
  onSwap: () => void;
};

const date = () => dateUtils.countdown(config.PHASE2_COUNTDOWN);

export const MainStablecoin: React.FC<MainStablecoinProps> = (props) => {
  const classes = useMainStablecoinStyles();

  const [countdown, setCountDown] = useState(date());

  useInterval(() => setCountDown(date()), 1000);

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography variant="h2" className={classes.title}>
        At the heart of the protocol lies USDap — the first-ever decentralized
        stablecoin backed by real-world assets with fixed periodic income.{' '}
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
          <div className={classes.cardContent}>
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
          </div>
          {config.BUY_BACK_ENABLE && (
            <Typography
              variant="body1"
              align="center"
              component="div"
              className={classes.swap}
            >
              <ButtonBase className={classes.swapButton} onClick={props.onSwap}>
                Time left to swap USDap to USDC with fixed price
              </ButtonBase>
              <Typography variant="inherit" component="div" align="center">
                till {countdown}
              </Typography>
            </Typography>
          )}
        </Plate>
        {props.children}
      </div>
    </div>
  );
};
