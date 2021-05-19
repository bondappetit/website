import clsx from 'clsx';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import {
  BN,
  humanizeNumeral,
  Link,
  LinkIfAccount,
  Plate,
  Typography,
  useNetworkConfig
} from 'src/common';
import { config } from 'src/config';
import { URLS } from 'src/router/urls';
import { StablecoinCollateralProtocolState } from '../stablecoin-collateral-protocol-state';
import { StablecoinTitle } from '../stablecoin-title';
import { useStablecoinCollateralStyles } from './stablecoin-collateral.styles';

export type StablecoinCollateralProps = {
  className?: string;
  stableCoinBalanceLoading: boolean;
  stableCoinBalanceValue?: BN;
  issuerBalanceLoading: boolean;
  issuerBalanceValue?: BN;
};

export const StablecoinCollateral: React.VFC<StablecoinCollateralProps> = (
  props
) => {
  const classes = useStablecoinCollateralStyles();

  const networkConfig = useNetworkConfig();

  return (
    <div className={clsx(classes.root, props.className)} id="collateral">
      <StablecoinTitle
        bold="Collateral"
        text={
          <>
            The assets of the protocol are formed by the outstanding debt of the
            borrowers, which, in turn, is secured by real-world collateral in
            the form of bonds kept on special security accounts.{' '}
            <Link
              color="blue"
              component={ReactRouterLink}
              to={URLS.collateral.list}
            >
              Learn More
            </Link>
          </>
        }
      />
      <Plate withoutBorder color="grey" className={classes.list}>
        <div className={classes.body}>
          <Typography variant="h5" align="center" className={classes.title}>
            Total issuance
          </Typography>
          <Typography variant="h2" align="center" className={classes.bodyText}>
            {props.stableCoinBalanceLoading && !props.stableCoinBalanceValue ? (
              '...'
            ) : (
              <>{humanizeNumeral(props.stableCoinBalanceValue)} USDap</>
            )}
          </Typography>
          <Typography variant="h5" align="center" className={classes.subtitle}>
            1 USDp = $1 USD
          </Typography>
        </div>
        <StablecoinCollateralProtocolState
          stableCoinBalanceValue={props.stableCoinBalanceValue}
          issuerBalanceValue={props.issuerBalanceValue}
        />
        <div className={classes.body}>
          <Typography variant="h5" align="center" className={classes.title}>
            Total protocol asset value
          </Typography>
          <Typography variant="h2" align="center" className={classes.bodyText}>
            {props.stableCoinBalanceLoading && !props.issuerBalanceValue ? (
              '...'
            ) : (
              <>${humanizeNumeral(props.issuerBalanceValue)}</>
            )}
          </Typography>
          <Typography variant="h5" align="center" className={classes.subtitle}>
            {config.IS_COLLATERAL ? (
              <Link
                component={ReactRouterLink}
                to={URLS.whitepaper}
                color="blue"
              >
                check here
              </Link>
            ) : (
              <LinkIfAccount title="check here">
                {
                  networkConfig.contracts.StableTokenDepositaryBalanceView
                    .address
                }
              </LinkIfAccount>
            )}
          </Typography>
        </div>
      </Plate>
    </div>
  );
};
