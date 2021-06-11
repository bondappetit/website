import clsx from 'clsx';
import React, { useState } from 'react';
import { useInterval } from 'react-use';

import { Button, COIN_ICONS, dateUtils, Typography } from 'src/common';
import { config } from 'src/config';
import { useMainStablecoinHowItWorks } from '../main-stablecoin-how-it-works';
import { useMainSwapStyles } from './main-swap.style';

export type MainSwapProps = {
  className?: string;
  onSwap: () => void;
};

const date = () => dateUtils.countdown(config.PHASE2_COUNTDOWN);

export const MainSwap: React.VFC<MainSwapProps> = (props) => {
  const USDapIcon = COIN_ICONS.get('USDap');
  const USDCIcon = COIN_ICONS.get('USDC');

  const classes = useMainSwapStyles();

  const [countdown, setCountDown] = useState(date());

  useInterval(() => setCountDown(date()), 1000);

  const [openHowItWorks] = useMainStablecoinHowItWorks(props.onSwap);

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.content}>
        <div className={classes.icons}>
          {USDapIcon && <USDapIcon className={classes.iconsItem} />}
          {USDCIcon && <USDCIcon className={classes.iconsItem} />}
        </div>
        <Typography variant="body1" component="div" className={classes.text}>
          Swap USDap to USDC in{' '}
          <Typography variant="inherit" weight="semibold">
            {countdown}
          </Typography>
          . At Phase 2, USDap collateral will be locked and converted into
          real-world assets.
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          variant="outlined"
          size="small"
          className={classes.actionsItem}
          onClick={openHowItWorks}
        >
          How it works
        </Button>
        <Button size="small" onClick={props.onSwap}>
          Swap USDap/USDC
        </Button>
      </div>
    </div>
  );
};
