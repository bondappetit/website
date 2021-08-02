import clsx from 'clsx';
import React, { useState } from 'react';
import { useInterval } from 'react-use';

import { config } from 'src/config';
import { Button, dateUtils, Typography } from 'src/common';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play.svg';
import { useMainHeaderStyles } from './main-header.styles';
import { useMainHowitWorksModal } from '../main-how-it-works-modal';

export type MainHeaderProps = {
  className?: string;
  totalValueLocked: string;
  stablecoinBalance: string;
  govCost: string;
  onBuyGov: () => void;
};

export const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const classes = useMainHeaderStyles();

  const [openMainHowItWorks] = useMainHowitWorksModal();
  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.content}>
        <Typography variant="h1" align="center" className={classes.title}>
          The first DeFi protocol that connects real-world debt instruments with
          the Ethereum ecosystem
        </Typography>
        <div className={classes.action}>
          <Button size="medium" onClick={props.onBuyGov}>
            Buy BAG
          </Button>
          <Button variant="outlined" size="medium" onClick={openMainHowItWorks}>
            <PlayIcon className={classes.playIcon} /> See how it works
          </Button>
        </div>
      </div>
      <div className={classes.stat}>
        <Typography variant="body1" component="div">
          <Typography variant="inherit" component="div" weight="semibold">
            Phase 2
          </Typography>
          <div>Real-World Asset Collateral</div>
        </Typography>
        <Typography variant="body1" component="div" align="right">
          <div>
            BAG:{' '}
            <Typography variant="inherit" weight="semibold">
              ${props.govCost}
            </Typography>
          </div>
          <div>
            Total Value Locked:{' '}
            <Typography variant="inherit" weight="semibold">
              ${props.totalValueLocked}
            </Typography>
          </div>
          <div>
            USDap Total Supply:{' '}
            <Typography variant="inherit" weight="semibold">
              ${props.stablecoinBalance}
            </Typography>
          </div>
        </Typography>
      </div>
    </div>
  );
};
