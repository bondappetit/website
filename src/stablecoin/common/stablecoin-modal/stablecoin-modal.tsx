import React from 'react';

import { Button, Modal, SmallModal, Typography } from 'src/common';
import { ReactComponent as BinanceIcon } from 'src/assets/icons/binance.svg';
import { ReactComponent as UniswapIcon } from 'src/assets/icons/uniswap.svg';
import { useStablecoinModalStyles } from './stablecoin-modal.styles';

export type StablecoinModalProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
};

export const StablecoinModal: React.FC<StablecoinModalProps> = (props) => {
  const classes = useStablecoinModalStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          <div className={classes.button}>
            <Typography variant="body1">From protocol</Typography>
            <Button>Buy</Button>
          </div>
          <div className={classes.button}>
            <Typography variant="body1">From protocol</Typography>
            <Button variant="outlined">
              <UniswapIcon />
              Uniswap
            </Button>
          </div>
          <div className={classes.button}>
            <Typography variant="body1">From protocol</Typography>
            <Button variant="outlined">
              <BinanceIcon />
              Binance
            </Button>
          </div>
        </div>
      </SmallModal>
    </Modal>
  );
};
