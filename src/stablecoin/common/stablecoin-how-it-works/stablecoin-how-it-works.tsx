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
          Current USDap holders can swap USDap for USDC on bondappetit.io at a
          fixed price of 1 USDap = 1 USDC{' '}
          <ButtonBase className={classes.swapLink} onClick={props.onSwap}>
            Swap USDap to USDC
          </ButtonBase>
        </Typography>
        <br />
        <Button className={classes.swap} onClick={props.onSwap}>
          Swap USDap to USDC
        </Button>
      </SmallModal>
    </Modal>
  );
};

export const useStablecoinHowItWorks = () => useModal(StablecoinHowItWorks);
