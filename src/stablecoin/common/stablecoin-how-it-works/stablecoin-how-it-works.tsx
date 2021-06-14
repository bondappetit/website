import React, { useState } from 'react';
import { useInterval } from 'react-use';

import {
  Modal,
  SmallModal,
  useModal,
  Typography,
  dateUtils,
  ButtonBase,
  Button
} from 'src/common';
import { config } from 'src/config';
import { useStablecoinHowItWorksStyles } from './stablecoin-how-it-works.styles';

export type StablecoinHowItWorksProps = {
  onClose?: () => void;
  onSwap: () => void;
};

const date = () => dateUtils.countdown(config.PHASE2_COUNTDOWN);

const StablecoinHowItWorks: React.VFC<StablecoinHowItWorksProps> = (props) => {
  const [countdown, setCountDown] = useState(date());

  useInterval(() => setCountDown(date()), 1000);

  const classes = useStablecoinHowItWorksStyles();

  return (
    <Modal className={classes.root} open onClose={props.onClose}>
      <SmallModal>
        <Typography variant="h5" weight="semibold">
          USDap is a stablecoin backed by real-world assets with fixed periodic
          income
        </Typography>
        <br />
        <Typography variant="h5">
          1. At Phase 1, the protocol raised USDap collateral in the form of
          USDC
        </Typography>
        <br />
        <Typography variant="h5">
          2. At Phase 2, USDap collateral will be locked and used for purchasing
          bonds
        </Typography>
        <br />
        <Typography variant="h5">
          3. Current USDap holders can swap USDap for USDC on bondappetit.io in{' '}
          {countdown} at a fixed price of 1 USDap = 1 USDC{' '}
          <ButtonBase className={classes.swapLink} onClick={props.onSwap}>
            Swap USDap to USDC
          </ButtonBase>
        </Typography>
        <br />
        <Typography variant="h5">
          4. Anyone can buy or sell USDap at any time at market price
        </Typography>
        <br />
        <Typography variant="h5">
          5. Holders of USDap can participate in new pools (to be launched at
          Phase 2) and earn more rewards
        </Typography>
        <Button className={classes.swap} onClick={props.onSwap}>
          Swap to USDap/USDC
        </Button>
      </SmallModal>
    </Modal>
  );
};

export const useStablecoinHowItWorks = (onSwap: () => void) =>
  useModal(<StablecoinHowItWorks onSwap={onSwap} />);
