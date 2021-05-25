import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, Plate, Typography } from 'src/common';
import { URLS } from 'src/router/urls';
import { useMainCollateralStyles } from './main-collateral.styles';
import { MainCollateralCard } from '../main-collateral-card';

export type MainCollateralProps = {
  className?: string;
};

export const MainCollateral: React.FC<MainCollateralProps> = (props) => {
  const classes = useMainCollateralStyles();

  return (
    <Plate
      withoutBorder
      color="grey"
      className={clsx(classes.root, props.className)}
    >
      <div className={classes.cards}>
        <MainCollateralCard id="3">
          The price of USDap{' '}
          <Typography variant="inherit" weight="semibold">
            equals $1 at all times
          </Typography>{' '}
          and is balanced automatically based on a basket of real-world debt
          obligations that form part of the protocol’s assets
        </MainCollateralCard>
        <MainCollateralCard id="4">
          Real-world collateral prevents the protocol from
          over-collateralization and{' '}
          <Typography variant="inherit" weight="semibold">
            ensures the stability
          </Typography>{' '}
          of the asset even in times of high volatility on the crypto market.
        </MainCollateralCard>
        <MainCollateralCard id="7">
          Real-world collateral{' '}
          <Typography variant="inherit" weight="semibold">
            allows the protocol to earn fixed periodic income
          </Typography>
          , which can be distributed to the token holders under incentivization
          mechanisms established by the community
        </MainCollateralCard>
      </div>
      <Typography variant="body1">
        <Link
          component={ReactRouterLink}
          to={URLS.collateral.list}
          color="blue"
        >
          Check Collateral
        </Link>
      </Typography>
    </Plate>
  );
};
