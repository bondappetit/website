import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link, Plate } from 'src/common';
import { URLS } from 'src/router/urls';
import { useCollateralPhasesStyles } from './collateral-phases.styles';

export type CollateralPhasesProps = {
  className?: string;
};

export const CollateralPhases: React.FC<CollateralPhasesProps> = (props) => {
  const classes = useCollateralPhasesStyles();

  return (
    <Plate
      color="grey"
      withoutBorder
      className={clsx(classes.phases, props.className)}
    >
      <div className={classes.phaseCard}>
        <Typography variant="h5" className={classes.phaseCardTitle}>
          Phase 1
        </Typography>
        <div>
          <Typography variant="h5" className={classes.phaseCardBody}>
            Accumulation of liquidity for BondAppetit’s stablecoin (USDap) in
            forms of USDc/USDap staking pool. Staking during Phase 1 allows
            investors to earn bigger staking rewards during the first 3 months.
          </Typography>
          <Typography variant="h5">
            <Link
              color="blue"
              component={ReactRouterLink}
              to={URLS.rewards.list}
            >
              Explore Staking →
            </Link>
          </Typography>
        </div>
      </div>
      <div className={classes.phaseCard}>
        <Typography variant="h5" className={classes.phaseCardTitle}>
          Phase 2
        </Typography>
        <div>
          <Typography variant="h5" className={classes.phaseCardBody}>
            The protocol’s assets are formed by the outstanding debt of the
            borrowers, which is secured by real-world collateral in the form of
            bonds stored on special custody accounts. All crypto assets
            accumulated during Phase 1 will be converted to RWA.
          </Typography>
          <Typography variant="h5">
            <Link
              color="blue"
              component={ReactRouterLink}
              to={URLS.collateral.borrow}
            >
              Explore Borrowing →
            </Link>
          </Typography>
        </div>
      </div>
    </Plate>
  );
};
