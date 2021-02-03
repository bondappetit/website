import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, Typography } from 'src/common';
import { URLS } from 'src/router/urls';
import { useMainCollateralStyles } from './main-collateral.styles';
import { MainCollateralCard } from '../main-collateral-card';

export type MainCollateralProps = {
  className?: string;
};

export const MainCollateral: React.FC<MainCollateralProps> = (props) => {
  const classes = useMainCollateralStyles();

  return (
    <div className={clsx(props.className)}>
      <Typography variant="h4" align="center" className={classes.mobileLink}>
        <Link
          component={ReactRouterLink}
          to={URLS.collateral.list}
          color="blue"
        >
          Explore Collateral →
        </Link>
      </Typography>
      <div className={classes.cards}>
        <MainCollateralCard id="3">
          The price of USDp{' '}
          <Typography variant="inherit" weight="bold">
            equals $1 at all times
          </Typography>{' '}
          and is balanced automatically based on a basket of real-world debt
          obligations that form part of the protocol’s assets
        </MainCollateralCard>
        <MainCollateralCard id="4">
          Real-world collateral prevents the protocol from
          over-collateralization and{' '}
          <Typography variant="inherit" weight="bold">
            ensures the stability
          </Typography>{' '}
          of the asset even in times of high volatility on the crypto market.
        </MainCollateralCard>
        <MainCollateralCard id="7">
          Real-world collateral{' '}
          <Typography variant="inherit" weight="bold">
            allows the protocol to earn fixed periodical income
          </Typography>
          , which can be distributed to holders of protocol tokens under
          incentivization mechanisms established by the community.
        </MainCollateralCard>
      </div>
      <Typography variant="h4" align="center" className={classes.desktopLink}>
        <Link
          component={ReactRouterLink}
          to={URLS.collateral.list}
          color="blue"
        >
          Explore Collateral →
        </Link>
      </Typography>
      <div className={classes.mobileCircles}>
        <div className={classes.circle} />
        <div className={classes.circle} />
        <div className={classes.circle} />
      </div>
    </div>
  );
};
