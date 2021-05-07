import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { BN, humanizeNumeral, Plate, Typography } from 'src/common';
import { BagTitle } from '../bag-title';
import { useBagCalculatorStyles } from './bag-calculator.styles';

export type BagCalculatorProps = {
  className?: string;
  bagCost?: string;
};

export const BagCalculator: React.VFC<BagCalculatorProps> = (props) => {
  const classes = useBagCalculatorStyles();

  const [totalValueOfCollateral, setTotalValueOfCollateral] = useState(50);
  const [totalBAGStaked, setTotalBAGStaked] = useState(50);
  const [yourBAGsStaked, setYourBAGsStaked] = useState(50);

  const totalValueOfCollateralBN = useMemo(
    () => new BN('1000000').multipliedBy(totalValueOfCollateral),
    [totalValueOfCollateral]
  );

  const totalBAGStakedBN = useMemo(
    () => new BN('1000000').multipliedBy(totalBAGStaked),
    [totalBAGStaked]
  );
  const yourBAGsStakedBN = useMemo(
    () => new BN('1000').multipliedBy(yourBAGsStaked),
    [yourBAGsStaked]
  );

  const yearlyValueInterestIncome = useMemo(
    () => totalValueOfCollateralBN.multipliedBy('0.05'),
    [totalValueOfCollateralBN]
  );

  const poolShare = useMemo(() => new BN(totalBAGStaked).div(yourBAGsStaked), [
    totalBAGStaked,
    yourBAGsStaked
  ]);

  const reward = useMemo(
    () => poolShare.multipliedBy(yearlyValueInterestIncome),
    [poolShare, yearlyValueInterestIncome]
  );

  const APY = useMemo(
    () => yourBAGsStakedBN.multipliedBy(props.bagCost ?? '1').div(reward),
    [reward, yourBAGsStakedBN, props.bagCost]
  );

  return (
    <div className={clsx(classes.root, props.className)}>
      <BagTitle
        bold="Coupon Rewards BAG"
        text={`is a unique token due to BondAppétit collateral. BAG holders have an
        option to earn rewards from real-world assets which lays behind the
        USDap. Stable income in USD distributed between holders as staking
        reward`}
      />
      <Plate color="grey" withoutBorder className={classes.table}>
        <div className={classes.head}>
          <Typography variant="h5" weight="bold" className={classes.headCol}>
            How it works
          </Typography>
          <Typography variant="h5" weight="bold" className={classes.col}>
            Sample calculation
          </Typography>
        </div>
        <ul className={classes.list}>
          <li className={classes.row}>
            <Typography variant="h5" component="div">
              The USDap stablecoin is backed by real-world collateral in the
              form of bonds. The value of the issued USDap equals to the value
              of the bonds in the collateral
            </Typography>
            <div className={classes.col}>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                Total value of USDap collateral
              </Typography>
              <Typography variant="h3">
                ${humanizeNumeral(totalValueOfCollateralBN)}
              </Typography>
              <Slider
                className={classes.slider}
                value={totalValueOfCollateral}
                onChange={setTotalValueOfCollateral}
                max={100}
                min={0}
              />
            </div>
          </li>
          <li className={classes.row}>
            <Typography variant="h5" component="div">
              Every quarter, the bonds generate interest income at 3-6% APY.
              Coupon payments are distributed among BAG token holders
            </Typography>
            <div className={classes.col}>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                Yearly value of interest income, avg.
              </Typography>
              <Typography variant="h3">
                ${humanizeNumeral(yearlyValueInterestIncome)}
              </Typography>
            </div>
          </li>
          <li className={classes.row}>
            <Typography variant="h5" component="div">
              BAG token holders stake their assets on a special contract (to be
              launched at Phase 2) to receive coupon payments
            </Typography>
            <div className={classes.col}>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                Total BAG staked in a pool
              </Typography>
              <Typography variant="h3">
                {humanizeNumeral(totalBAGStakedBN)}
              </Typography>
              <Slider
                className={classes.slider}
                max={100}
                min={0}
                value={totalBAGStaked}
                onChange={setTotalBAGStaked}
              />
            </div>
          </li>
          <li className={classes.row}>
            <Typography variant="h5" component="div">
              As long as the BAG tokens remain staked, their holders will
              receive rewards in accordance with their share of the pool. The
              rewards are distributed every 15 seconds
            </Typography>
            <div className={clsx(classes.col, classes.colGrid)}>
              <div>
                <Typography
                  variant="h5"
                  component="div"
                  className={classes.title}
                >
                  Your BAGs staked
                </Typography>
                <Typography variant="h3">
                  {humanizeNumeral(yourBAGsStakedBN)}
                </Typography>
                <Slider
                  className={classes.slider}
                  max={100}
                  min={0}
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
                  {humanizeNumeral(poolShare)}%
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
                  APY (1 BAG = ${humanizeNumeral(props.bagCost)})
                </Typography>
                <Typography variant="h3">{humanizeNumeral(APY)}%</Typography>
              </div>
            </div>
          </li>
        </ul>
        <Typography variant="h5" component="div" className={classes.hint}>
          This example based on BondAppétit plans and expectations and average
          historical data. Numbers can be different in real case, depends on the
          BAG price and total value of protocol collateral to the date of Phase
          2 launch. But the main formula still the same: Your profit = (Coupon
          income / Total BAGs) * Your pool share
        </Typography>
      </Plate>
    </div>
  );
};
