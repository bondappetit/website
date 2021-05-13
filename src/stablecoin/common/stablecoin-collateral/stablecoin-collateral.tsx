import clsx from 'clsx';
import React from 'react';

import { Link, Plate } from 'src/common';
import { StablecoinTitle } from '../stablecoin-title';
import { useStablecoinCollateralStyles } from './stablecoin-collateral.styles';

export type StablecoinCollateralProps = {
  className?: string;
};

export const StablecoinCollateral: React.VFC<StablecoinCollateralProps> = (
  props
) => {
  const classes = useStablecoinCollateralStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <StablecoinTitle
        bold="Collateral"
        text={
          <>
            The assets of the protocol are formed by outstanding debt of the
            borrowers, which in turn is secured by real world collateral in form
            of bonds kept on special security accounts.{' '}
            <Link color="blue" href="/">
              Learn More
            </Link>
          </>
        }
      />
      <Plate withoutBorder color="grey">
        asdf
      </Plate>
    </div>
  );
};
