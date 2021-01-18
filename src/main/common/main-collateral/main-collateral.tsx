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
      <Typography variant="h4" align="center" className={classes.title}>
        The assets of the protocol are formed by outstanding debt of the
        borrowers, which in turn is secured by real world collateral in form of
        bonds kept on special security accounts.
      </Typography>
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
        <MainCollateralCard>
          The price of USDp equals $1 at all times and is balanced automatically
          based on a basket of real-world debt obligations that form part of the
          protocol’s assets
        </MainCollateralCard>
        <MainCollateralCard>
          Real-world collateral prevents the protocol from
          over-collateralization and ensures the stability of the asset even in
          times of high volatility on the crypto market.
        </MainCollateralCard>
        <MainCollateralCard>
          Real-world collateral allows the protocol to earn fixed periodical
          income, which can be distributed to holders of protocol tokens under
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
