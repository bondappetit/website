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
    <div className={clsx(classes.root, props.className)}>
      <Plate className={classes.graph}>
        <Typography variant="body1" align="center">
          {props.loading && '...'}
          <Typography variant="inherit" component="span">
            {!props.loading && (
              <>
                Total Issued today:{' '}
                <Typography variant="inherit" component="span" weight="bold">
                  {totalLiquidityUSD} USDap
                </Typography>
              </>
            )}
          </Typography>
        </Typography>
        <div>
          <div className={classes.lines}>
            <div className={classes.line}>
              <div className={classes.lineLegend}>$20M</div>
            </div>
            <div className={classes.line} />
            <div className={classes.line} />
            <div className={classes.line} />
            <div className={classes.line} />
          </div>
        </div>
      </Plate>
      {props.children}
    </div>
  );
};
