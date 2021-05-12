import React, { useMemo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Typography, Link, Button, Skeleton, BN } from 'src/common';
import { URLS } from 'src/router/urls';
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
    <div className={props.className}>
      <div className={classes.ellipse}>
        <Typography variant="h1" align="center" className={classes.title}>
          Decentralized stablecoin based on real-world assets
        </Typography>
        <div>
          <Typography variant="body1" align="center" className={classes.info}>
            <Typography
              variant="inherit"
              component="span"
              className={classes.supply}
            >
              {props.loading && <Skeleton className={classes.skeleton} />}
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
          <div className={classes.actions}>
            <Button onClick={props.onBuy}>Buy</Button>
            <Button onClick={props.onSell}>Sell</Button>
          </div>
        </div>
      </div>
      <div className={classes.subtext}>
        <Typography variant="h4" align="center">
          <Typography variant="inherit" component="p" align="center">
            USDap is the first-ever decentralized stablecoin based on a basket
            of real-world debt obligations. The price of USDap equals $1 at all
            times and the asset is issued only with sufficient collateral.
          </Typography>
          <Link
            color="blue"
            component={ReactRouterLink}
            to={`${URLS.whitepaper}#3`}
          >
            Learn more
          </Link>
        </Typography>
      </div>
    </div>
  );
};
