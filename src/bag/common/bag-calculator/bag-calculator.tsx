import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Link as ReactRouterLink } from 'react-router-dom';

import { BN, humanizeNumeral, Plate, Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { BagTitle } from '../bag-title';
import { useBagCalculatorStyles } from './bag-calculator.styles';

export type BagCalculatorProps = {
  className?: string;
  bagPrice?: string;
};

export const BagCalculator: React.VFC<BagCalculatorProps> = (props) => {
  const classes = useBagCalculatorStyles();

  const [totalValueOfCollateral, setTotalValueOfCollateral] = useState(1);
  const [totalBAGStaked, setTotalBAGStaked] = useState(5);
  const [yourBAGsStaked, setYourBAGsStaked] = useState(1);

  const totalValueOfCollateralBN = useMemo(
    () => new BN('100000000').multipliedBy(totalValueOfCollateral),
    [totalValueOfCollateral]
  );

  const totalBAGStakedBN = useMemo(
    () => new BN('1000000').multipliedBy(totalBAGStaked),
    [totalBAGStaked]
  );
  const yourBAGsStakedBN = useMemo(
    () => new BN(totalBAGStakedBN.div(100)).multipliedBy(yourBAGsStaked),
    [yourBAGsStaked, totalBAGStakedBN]
  );

  const yearlyValueInterestIncome = useMemo(
    () => totalValueOfCollateralBN.multipliedBy('0.05'),
    [totalValueOfCollateralBN]
  );

  const poolShare = useMemo(
    () => new BN(yourBAGsStakedBN).div(totalBAGStakedBN),
    [totalBAGStakedBN, yourBAGsStakedBN]
  );

  const reward = useMemo(
    () => poolShare.multipliedBy(yearlyValueInterestIncome),
    [poolShare, yearlyValueInterestIncome]
  );

  const APY = useMemo(
    () =>
      reward
        .div(yourBAGsStakedBN.multipliedBy(props.bagPrice ?? '1'))
        .multipliedBy(100),
    [reward, yourBAGsStakedBN, props.bagPrice]
  );

  return (
    <div className={clsx(classes.root, props.className)} id="coupon">
      <BagTitle
        title="Coupon Rewards"
        text={
          <>
            BAG is made unique as a token thanks to the collateral of
            BondAppétit. BAG holders have the option to earn rewards from
            real-world assets, which back the USDap. Stable income in USD
            distributed between holders as staking rewards.{' '}
            <Link
              color="blue"
              component={ReactRouterLink}
              to={URLS.staking.list}
            >
              Stake and Earn
            </Link>
          </>
        }
      />
      <Plate color="grey" withoutBorder>
        <div className={classes.table}>
          <Typography
            variant="h5"
            weight="semibold"
            className={clsx(classes.headCol, classes.howItWorks)}
          >
            How it works
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={clsx(classes.num1, classes.borderTop)}
          >
            1
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={clsx(classes.step, classes.text1, classes.borderTop)}
          >
            The USDap stablecoin is backed by real-world collateral in the form
            of bonds. The value of the issued USDap equals to the value of the
            bonds in the collateral
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={clsx(classes.num2, classes.borderTop)}
          >
            2
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={clsx(classes.step, classes.text2, classes.borderTop)}
          >
            Every quarter, the bonds generate interest income at 3-6% APY.
            Coupon payments minus technical costs of the protocol are
            distributed among BAG token holders.
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={clsx(classes.num3, classes.borderTop)}
          >
            3
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={clsx(classes.step, classes.text3, classes.borderTop)}
          >
            BAG token holders stake their assets on a special contract (to be
            launched at Phase 2) to receive coupon payments.
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={clsx(classes.num4, classes.borderTop)}
          >
            4
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className={clsx(classes.step, classes.text4, classes.borderTop)}
          >
            As long as the BAG tokens remain staked, their holders will receive
            rewards in accordance with their share of the pool. The rewards are
            distributed every block (15 seconds).
          </Typography>
          <Typography
            variant="h5"
            weight="semibold"
            className={clsx(classes.headCol, classes.sampleCalculation)}
          >
            Sample calculation
          </Typography>
          <div className={clsx(classes.col, classes.value1, classes.borderTop)}>
            <Typography variant="h5" component="div" className={classes.title}>
              Total value of USDap collateral
            </Typography>
            <Typography variant="h3">
              ${humanizeNumeral(totalValueOfCollateralBN)}
            </Typography>
            <Slider
              className={classes.slider}
              value={totalValueOfCollateral}
              onChange={setTotalValueOfCollateral}
              max={10}
              min={1}
            />
          </div>
          <div className={clsx(classes.col, classes.value2, classes.borderTop)}>
            <Typography variant="h5" component="div" className={classes.title}>
              Yearly value of interest income, avg. (5%)
            </Typography>
            <Typography variant="h3">
              ${humanizeNumeral(yearlyValueInterestIncome)}
            </Typography>
          </div>
          <div className={clsx(classes.col, classes.value3, classes.borderTop)}>
            <Typography variant="h5" component="div" className={classes.title}>
              Total BAG staked in a contract
            </Typography>
            <Typography variant="h3">
              {humanizeNumeral(totalBAGStakedBN)}
            </Typography>
            <Slider
              className={classes.slider}
              max={10}
              min={1}
              value={totalBAGStaked}
              onChange={setTotalBAGStaked}
            />
          </div>
          <div
            className={clsx(
              classes.col,
              classes.colGrid,
              classes.value4,
              classes.borderTop
            )}
          >
            <div>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                Your BAG staked
              </Typography>
              <Typography variant="h3">
                {humanizeNumeral(yourBAGsStakedBN)}
              </Typography>
              <Slider
                className={classes.slider}
                max={totalBAGStaked}
                min={1}
                value={yourBAGsStaked}
                onChange={setYourBAGsStaked}
              />
            </div>
            <div>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                Pool share
              </Typography>
              <Typography variant="h3">
                {humanizeNumeral(poolShare.multipliedBy(100))}%
              </Typography>
            </div>
            <div>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                Your annual reward
              </Typography>
              <Typography variant="h3">${humanizeNumeral(reward)}</Typography>
            </div>
            <div>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                APY (1 BAG = ${humanizeNumeral(props.bagPrice)})
              </Typography>
              <Typography variant="h3">{humanizeNumeral(APY)}%</Typography>
            </div>
          </div>
        </div>
        <Typography
          variant="h5"
          component="div"
          className={clsx(classes.hint, classes.borderTop)}
        >
          This example is based on BondAppétit plans and expectations, and on
          average historical data. Numbers may differ, depending on the BAG
          price and total value of protocol collateral at the date of Phase 2
          launch. However, the main formula remains the same: Your profit =
          (Coupon income / Total BAGs) * Your pool share
        </Typography>
      </Plate>
    </div>
  );
};
