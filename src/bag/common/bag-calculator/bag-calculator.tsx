import clsx from 'clsx';
import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { humanizeNumeral, Plate, Typography } from 'src/common';
import { BagTitle } from '../bag-title';
import { useBagCalculatorStyles } from './bag-calculator.styles';

export type BagCalculatorProps = {
  className?: string;
};

export const BagCalculator: React.VFC<BagCalculatorProps> = (props) => {
  const classes = useBagCalculatorStyles();

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
                ${humanizeNumeral('10000000')}
              </Typography>
              <Slider className={classes.slider} />
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
              <Typography variant="h3">${humanizeNumeral('500000')}</Typography>
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
                {humanizeNumeral('10000000')}
              </Typography>
              <Slider className={classes.slider} />
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
                <Typography variant="h3">{humanizeNumeral('1000')}</Typography>
                <Slider className={classes.slider} />
              </div>
              <div>
                <Typography
                  variant="h5"
                  component="div"
                  className={classes.title}
                >
                  Pool share
                </Typography>
                <Typography variant="h3">{humanizeNumeral('001')}%</Typography>
              </div>
              <div>
                <Typography
                  variant="h5"
                  component="div"
                  className={classes.title}
                >
                  Your annual reward
                </Typography>
                <Typography variant="h3">${humanizeNumeral('5000')}</Typography>
              </div>
              <div>
                <Typography
                  variant="h5"
                  component="div"
                  className={classes.title}
                >
                  APY (1 BAG = $0.41)
                </Typography>
                <Typography variant="h3">{humanizeNumeral('2432')}%</Typography>
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
