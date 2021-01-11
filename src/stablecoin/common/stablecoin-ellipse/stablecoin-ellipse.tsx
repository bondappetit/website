import React from 'react';

import { Typography, Link, Button } from 'src/common';
import { useStablecoinEllipseStyles } from './stablecoin-ellipse.styles';

export type StablecoinEllipseProps = {
  className?: string;
  onBuy: () => void;
};

export const StablecoinEllipse: React.FC<StablecoinEllipseProps> = (props) => {
  const classes = useStablecoinEllipseStyles();

  return (
    <div className={props.className}>
      <div className={classes.ellipse}>
        <Typography variant="h1" align="center" className={classes.title}>
          The first-ever decentralized
          <br />
          stablecoin based on real-world assets
        </Typography>
        <div>
          <Typography variant="body1" align="center" className={classes.info}>
            <Typography
              variant="inherit"
              component="span"
              className={classes.supply}
            >
              Circulating Supply:{' '}
              <Typography variant="inherit" component="span" weight="bold">
                64,840,720 USDp
              </Typography>
            </Typography>
            <Typography variant="inherit" component="span">
              Volume (24h):{' '}
              <Typography variant="inherit" component="span" weight="bold">
                64,840,720 USDp
              </Typography>
            </Typography>
          </Typography>
          <div className={classes.actions}>
            <Button onClick={props.onBuy}>Buy</Button>
            <Button>Sell</Button>
          </div>
        </div>
      </div>
      <div className={classes.subtext}>
        <Typography variant="h4" align="center">
          <Typography variant="inherit" component="p" align="center">
            USDp is the first-ever decentralized stablecoin that is based on a
            basket of real-world debt obligations. USDp price equals $1 at all
            times and asset is issued only with sufficient collateral.
          </Typography>
          <Link href="#more" color="blue">
            Learn more
          </Link>
        </Typography>
      </div>
    </div>
  );
};
