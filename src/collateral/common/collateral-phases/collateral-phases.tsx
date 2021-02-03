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
            Accamulation of liquidity for BondAppétit stablecoin USDp in forms
            of USDc/USDp and USDN/USDp staking pools available for early
            investors. Phase 1 staking allows to earn more staking rewards
            during first 6 month.
          </Typography>
          <Typography variant="h5">
            <Link
              color="blue"
              component={ReactRouterLink}
              to={URLS.staking.list}
            >
              Explore Staking →
            </Link>
          </Typography>
        </div>
      </div>
      <div className={classes.phaseCard}>
        <Typography variant="h5" className={classes.phaseCardTitle}>
          Phase 3
        </Typography>
        <div>
          <Typography variant="h5" className={classes.phaseCardBody}>
            The assets of the protocol are formed by outstanding debt of the
            borrowers, which in turn is secured by real world collateral in form
            of bonds kept on special security accounts.
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
