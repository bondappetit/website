import React from 'react';

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
          <div className={classes.buttons}>
            {props.withBuy && (
              <Button onClick={props.onBuy} className={classes.button}>
                Buy from protocol
              </Button>
            )}
            <Button
              variant="outlined"
              component={Link}
              href={`https://info.uniswap.org/token/${props.tokenAddress}`}
              target="_blank"
              className={classes.button}
            >
              <UniswapIcon />
              Uniswap
            </Button>
          </div>
          <Typography variant="body1">
            <Typography variant="inherit" weight="bold">
              Bonus
            </Typography>
            : Get +5% as BAG reward buying from protocol
          </Typography>
        </div>
      </SmallModal>
    </Modal>
  );
};
