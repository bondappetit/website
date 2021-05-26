import React from 'react';

import { Typography, Button, Plate, BN } from 'src/common';
import { useStablecoinBuyingSellingStyles } from './stablecoin-buying-selling.styles';

export type StablecoinBuyingSellingProps = {
  onBuy: () => void;
  onSell: () => void;
  stableCoinBalanceLoading: boolean;
  stableCoinBalanceValue?: BN;
};

const StablecoinBuyingSelling: React.FC<StablecoinBuyingSellingProps> = (
  props
) => {
  const classes = useStablecoinBuyingSellingStyles();

  return (
    <Plate className={classes.root}>
      {/* // TODO: hide for now */}
      {false && (
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
      )}
      <div className={classes.actions}>
        <Button onClick={props.onBuy}>Buy</Button>
        <Button onClick={props.onSell}>Sell</Button>
      </div>
    </Plate>
  );
};

export default StablecoinBuyingSelling;
