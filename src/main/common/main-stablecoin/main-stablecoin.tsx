import clsx from 'clsx';
import React, { useState } from 'react';
import { useTheme } from 'react-jss';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useInterval } from 'react-use';

import {
  Button,
  Typography,
  Link,
  Plate,
  ButtonBase,
  dateUtils,
  Theme
} from 'src/common';
import { config } from 'src/config';
import { URLS } from 'src/router/urls';
import { StablecoinChart } from 'src/stablecoin';
import { MainTextCard } from '../main-text-card';
import { useMainStablecoinStyles } from './main-stablecoin.styles';

export type MainStablecoinProps = {
  className?: string;
  onBuy: () => void;
  onSell: () => void;
  stablecoinBalance: string;
  onSwap: () => void;
};

const date = () => dateUtils.countdown(config.PHASE2_COUNTDOWN);

export const MainStablecoin: React.VFC<MainStablecoinProps> = (props) => {
  const classes = useMainStablecoinStyles();

  const [countdown, setCountDown] = useState(date());

  useInterval(() => setCountDown(date()), 1000);

  const theme = useTheme<Theme>();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography variant="h2" className={classes.title}>
        USDap is the first decentralized stablecoin backed by yield-generating
        bonds.{' '}
        <Link
          component={ReactRouterLink}
          to={URLS.stablecoin}
          className={classes.link}
        >
          Explore USDap
        </Link>
      </Typography>
      <div className={classes.grid}>
        <Plate className={classes.card}>
          <div className={classes.cardContent}>
            <Typography variant="h3" weight="semibold" align="center">
              USDap Total Supply
            </Typography>
            <Typography
              variant="h3"
              align="center"
              className={classes.cardSubtitle}
            >
              ${props.stablecoinBalance}
            </Typography>
            <StablecoinChart
              key={theme.currentTheme}
              className={classes.chart}
            />
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
        <Plate withoutBorder color="grey" className={classes.text}>
          <div className={classes.cards}>
            <MainTextCard>
              USDap is a stablecoin done right. Algorithmic automated issuance,
              real-world assets as collateral, and publicly available oracles
              for real-time collateral verification.
              <br />
              <Link
                color="blue"
                component={ReactRouterLink}
                to={`${URLS.whitepaper}#3`}
              >
                Learn more
              </Link>
            </MainTextCard>
            <MainTextCard>
              The bonds that back USDap are stored by a licensed custodian in a
              stable jurisdiction. Anyone can check their availability any time
              online. No single protocol with fiat collateral has this level of
              transparency.
              <br />
              <Link
                color="blue"
                component={ReactRouterLink}
                to={URLS.collateral.list}
              >
                Check the collateral
              </Link>
            </MainTextCard>
            <MainTextCard>
              Provide liquidity for the protocol and earn ample rewards.
              <br />
              <Link
                color="blue"
                component={ReactRouterLink}
                to={URLS.rewards.list}
              >
                Stake
              </Link>
            </MainTextCard>
          </div>
        </Plate>
      </div>
    </div>
  );
};
