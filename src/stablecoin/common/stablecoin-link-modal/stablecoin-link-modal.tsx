import React from 'react';

import { Button, Modal, SmallModal, Typography, Link } from 'src/common';
import { ReactComponent as BinanceIcon } from 'src/assets/icons/binance.svg';
import { ReactComponent as UniswapIcon } from 'src/assets/icons/uniswap.svg';
import { useStablecoinLinkModalStyles } from './stablecoin-link-modal.styles';

export type StablecoinLinkModalProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
  onBuy?: () => void;
  withBuy?: boolean;
};

export const StablecoinLinkModal: React.FC<StablecoinLinkModalProps> = (
  props
) => {
  const classes = useStablecoinLinkModalStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          {props.withBuy && (
            <div className={classes.button}>
              <Typography variant="body1">From protocol</Typography>
              <Button onClick={props.onBuy}>Buy</Button>
            </div>
          )}
          <div className={classes.button}>
            <Typography variant="body1">Decentralized Exchange</Typography>
            <Button
              variant="outlined"
              component={Link}
              href="https://app.uniswap.org/"
              target="_blank"
            >
              <UniswapIcon />
              Uniswap
            </Button>
          </div>
          <div className={classes.button}>
            <Typography variant="body1">Centralized Exchange</Typography>
            <Button
              variant="outlined"
              component={Link}
              href="https://www.binance.com/"
              target="_blank"
            >
              <BinanceIcon />
              Binance
            </Button>
          </div>
        </div>
      </SmallModal>
    </Modal>
  );
};
