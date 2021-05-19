import clsx from 'clsx';
import React, { useMemo } from 'react';

import { Typography, BN, Plate } from 'src/common';
import { SablecoinInfo } from '../use-stable-coin-info';
import { useStablecoinGraphStyles } from './stablecoin-graph.styles';

export type StablecoinGraphProps = {
  className?: string;
  tokenInfo?: SablecoinInfo;
  loading: boolean;
};

const round = (sum?: string | null) => {
  if (!sum) return '0';

  return new BN(sum.replace(',', '')).integerValue().toFormat(0);
};

export const StablecoinGraph: React.FC<StablecoinGraphProps> = (props) => {
  const classes = useStablecoinGraphStyles();

  const totalLiquidityUSD = useMemo(
    () =>
      round(props.tokenInfo?.data?.token?.data?.statistic?.totalLiquidityUSD),
    [props.tokenInfo]
  );

  return (
    <div className={clsx(classes.root, props.className)} id="usdap">
      <Plate className={classes.inner}>
        <Typography variant="body1" align="center" className={classes.title}>
          {props.loading && '...'}
          <Typography variant="inherit" component="span">
            {!props.loading && (
              <>
                Total Issuance:{' '}
                <Typography
                  variant="inherit"
                  component="span"
                  weight="semibold"
                >
                  {totalLiquidityUSD} USDap
                </Typography>
              </>
            )}
          </Typography>
        </Typography>
        <div className={classes.chart}>
          <div className={classes.lines}>
            <div className={classes.line}>
              <div className={classes.lineLegend}>$20M</div>
            </div>
            <div className={classes.line}>
              <div className={classes.lineLegend}>$15M</div>
            </div>
            <div className={classes.line}>
              <div className={classes.lineLegend}>$10M</div>
            </div>
            <div className={classes.line}>
              <div className={classes.lineLegend}>$5M</div>
            </div>
            <div className={classes.line}>
              <div className={classes.lineLegend}>$0</div>
            </div>
          </div>
          <div className={classes.bars}>
            <div className={classes.bar}>
              <div className={clsx(classes.barHalf, classes.barUnfilled)} />
              <div className={clsx(classes.barHalf, classes.barFilled)} />
              <div className={classes.year}>2021</div>
            </div>
            <div className={classes.bar}>
              <div className={clsx(classes.barHalf, classes.barUnfilled)} />
              <div className={clsx(classes.barHalf, classes.barFilled)} />
              <div className={classes.year}>2022</div>
            </div>
            <div className={classes.bar}>
              <div className={clsx(classes.barHalf, classes.barUnfilled)} />
              <div className={clsx(classes.barHalf, classes.barFilled)} />
              <div className={classes.year}>2023</div>
            </div>
            <div className={classes.bar}>
              <div className={clsx(classes.barHalf, classes.barUnfilled)} />
              <div className={clsx(classes.barHalf, classes.barFilled)} />
              <div className={classes.year}>2024</div>
            </div>
            <div className={classes.bar}>
              <div className={clsx(classes.barHalf, classes.barUnfilled)} />
              <div className={clsx(classes.barHalf, classes.barFilled)} />
              <div className={classes.year}>2025</div>
            </div>
          </div>
        </div>
        <div className={classes.legend}>
          <Typography
            variant="body2"
            className={classes.legendItem}
            component="div"
          >
            <div className={clsx(classes.barHalf, classes.barUnfilled)} />
            <span>— target collateral value</span>
          </Typography>
          <Typography
            variant="body2"
            className={classes.legendItem}
            component="div"
          >
            <div className={clsx(classes.barHalf, classes.barFilled)} />
            <span>— target coupon income</span>
          </Typography>
        </div>
      </Plate>
      {props.children}
    </div>
  );
};
