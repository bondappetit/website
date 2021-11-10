import React, { useState } from 'react';
import { useInterval } from 'react-use';

import {
  Typography,
  Button,
  Plate,
  BN,
  ButtonBase,
  dateUtils
} from 'src/common';
import { config } from 'src/config';
import { useStablecoinBuyingSellingStyles } from './stablecoin-buying-selling.styles';

export type StablecoinBuyingSellingProps = {
  onBuy: () => void;
  onSell: () => void;
  stableCoinBalanceLoading: boolean;
  stableCoinBalanceValue?: BN;
  onSwap: () => void;
};

const date = () => dateUtils.countdown(config.PHASE2_COUNTDOWN);

export const StablecoinBuyingSelling: React.FC<StablecoinBuyingSellingProps> = (
  props
) => {
  const classes = useStablecoinBuyingSellingStyles();

  const [countdown, setCountDown] = useState(date());

  useInterval(() => setCountDown(date()), 1000);

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
