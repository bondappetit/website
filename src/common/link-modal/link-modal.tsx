import React from 'react';

import { ReactComponent as BinanceIcon } from 'src/assets/icons/binance.svg';
import { ReactComponent as UniswapIcon } from 'src/assets/icons/uniswap.svg';
import { Button } from '../button';
import { Modal } from '../modal';
import { SmallModal } from '../small-modal';
import { Typography } from '../typography';
import { Link } from '../link';
import { useLinkModalStyles } from './link-modal.styles';

export type LinkModalProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
  onBuy?: () => void;
  withBuy?: boolean;
  tokenAddress: string;
};

export const LinkModal: React.FC<LinkModalProps> = (props) => {
  const classes = useLinkModalStyles();

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
              href={`https://info.uniswap.org/token/${props.tokenAddress}`}
              target="_blank"
            >
              <UniswapIcon />
              Uniswap
            </Button>
          </div>
          {false && (
            <div className={classes.button}>
              {/* TODO: hide binance for now */}
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
          )}
        </div>
      </SmallModal>
    </Modal>
  );
};
