import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, Plate, Typography } from 'src/common';
import { URLS } from 'src/router/urls';
import { useStablecoinDecentralizedStyles } from './stablecoin-decentralized.styles';

export type StablecoinDecentralizedProps = {
  className?: string;
};

export const StablecoinDecentralized: React.FC<StablecoinDecentralizedProps> = (
  props
) => {
  const classes = useStablecoinDecentralizedStyles();

  return (
    <div className={props.className}>
      <div className={classes.text}>
        <Typography variant="h2" align="center" className={classes.title}>
          Why USDap is Decentralized
        </Typography>
        <Typography variant="h4" align="center" component="p">
          Each centralized stablecoin is backed by an entity that is in full
          control of its issuance and of the collateral. There are no publicly
          available instruments for verifying the collateral in real-time,
          therefore, the owners of centralized stablecoins must trust the
          issuer. With USDap, everything is different.
        </Typography>
      </div>
      <div className={classes.list}>
        <Plate className={classes.card}>
          <Typography
            variant="h4"
            weight="bold"
            align="center"
            className={classes.cardTitle}
          >
            Decentralized and Transparent
          </Typography>
          <Typography variant="h4" align="center">
            There is no centralized issuer behind USDap — the tokens are issued
            automatically by a smart-contract only when the required collateral
            is available. All related information can be checked by any user in
            real-time.
          </Typography>
          <Typography variant="h4" align="center" className={classes.link}>
            <Link
              color="blue"
              component={ReactRouterLink}
              to={URLS.collateral.list}
            >
              Learn more
            </Link>
          </Typography>
        </Plate>
        <Plate className={classes.card}>
          <Typography
            variant="h4"
            weight="bold"
            align="center"
            className={classes.cardTitle}
          >
            Crypto-liquidity backed by real cash flows
          </Typography>
          <Typography variant="h4" align="center">
            USDap has its own crypto liquidity pools, which are partially
            composed of liquidity flows coming from real-world assets.
          </Typography>
          <Typography variant="h4" align="center" className={classes.link}>
            <Link
              color="blue"
              component={ReactRouterLink}
              to={`${URLS.whitepaper}#6`}
            >
              Learn more
            </Link>
          </Typography>
        </Plate>
      </div>
    </div>
  );
};
