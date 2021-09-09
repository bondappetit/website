import clsx from 'clsx';
import React from 'react';

import { Button, Typography } from 'src/common';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play.svg';
import { useMainHeaderStyles } from './main-header.styles';
import { useMainHowitWorksModal } from '../main-how-it-works-modal';

export type MainHeaderProps = {
  className?: string;
  totalValueLocked: string;
  stablecoinBalance: string;
  govCost: string;
  onBuyStable: () => void;
};

export const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const classes = useMainHeaderStyles();

  const [openMainHowItWorks] = useMainHowitWorksModal();

  const handleOpenHowItWorks = () => openMainHowItWorks();

  return (
    <div className={clsx(classes.root, props.className)}>
      <div className={classes.content}>
        <Typography variant="h1" align="center" className={classes.title}>
          The first decentralized lending protocol with a stablecoin 100% backed
          by yield&#8209;generating bonds
        </Typography>
        <div className={classes.action}>
          <Button size="medium" onClick={props.onBuyStable}>
            Buy USDap
          </Button>
          <Button
            variant="outlined"
            size="medium"
            onClick={handleOpenHowItWorks}
            className={classes.play}
          >
            <PlayIcon className={classes.playIcon} /> See how it works
          </Button>
        </div>
      </div>
      <div className={classes.stat}>
        <Typography variant="body1" component="div">
          <Typography variant="inherit" component="div" weight="semibold">
            Phase 2
          </Typography>
          <Typography variant="inherit" component="div">
            Real-World Asset Collateral
          </Typography>
          <Typography
            variant="inherit"
            component="div"
            weight="semibold"
            className={classes.live}
          >
            Live <div className={classes.liveIndicator} />
          </Typography>
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
