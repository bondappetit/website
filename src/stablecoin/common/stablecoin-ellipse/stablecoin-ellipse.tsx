import clsx from 'clsx';
import React, { useMemo } from 'react';

import { Typography, Button, Skeleton, BN, Plate } from 'src/common';
import { SablecoinInfo } from '../use-stable-coin-info';
import { useStablecoinEllipseStyles } from './stablecoin-ellipse.styles';

export type StablecoinEllipseProps = {
  className?: string;
  onBuy: () => void;
  onSell: () => void;
  tokenInfo?: SablecoinInfo;
  loading: boolean;
};

const round = (sum?: string | null) => {
  if (!sum) return '0';

  return new BN(sum.replace(',', '')).integerValue().toFormat(0);
};

export const StablecoinEllipse: React.FC<StablecoinEllipseProps> = (props) => {
  const classes = useStablecoinEllipseStyles();

  const totalLiquidityUSD = useMemo(
    () =>
      round(props.tokenInfo?.data?.token?.data?.statistic?.totalLiquidityUSD),
    [props.tokenInfo]
  );

  return (
    <div className={clsx(classes.root, props.className)}>
      <Plate className={classes.graph}>
        <Typography variant="body1" align="center">
          {props.loading && <Skeleton className={classes.skeleton} />}
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
      </Plate>
      <Plate className={classes.sellingBuying}>
        <div className={classes.info}>
          <Typography variant="body1" align="center">
            Circulating Supply:{' '}
            <Typography variant="inherit" weight="bold">
              64,840,720 USDap
            </Typography>
          </Typography>
          <Typography variant="body1" align="center">
            Volume (24h):{' '}
            <Typography variant="inherit" weight="bold">
              124,720 USDap
            </Typography>
          </Typography>
        </div>
        <div className={classes.actions}>
          <Button onClick={props.onBuy}>Buy</Button>
          <Button onClick={props.onSell}>Sell</Button>
        </div>
      </Plate>
    </div>
  );
};
