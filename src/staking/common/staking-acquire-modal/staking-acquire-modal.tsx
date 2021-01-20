import React from 'react';

import { Button, Link, SmallModal, Typography, Modal } from 'src/common';
import { useStakingAcquireModalStyles } from './staking-acquire-modal.styles';

export type StakingAcquireModalProps = {
  open: boolean;
  onClose: () => void;
  tokenName?: string;
};

export const StakingAcquireModal: React.FC<StakingAcquireModalProps> = (
  props
) => {
  const classes = useStakingAcquireModalStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          <div className={classes.content}>
            <Typography
              weight="bold"
              variant="h5"
              align="center"
              className={classes.title}
            >
              To acquire {props.tokenName}.
            </Typography>
            <Typography variant="h5" align="center">
              Stake your BAG to{' '}
              <Link href="https://uniswap.org/" color="blue">
                uniswap liquidity pool
              </Link>
            </Typography>
            <Typography variant="h5" align="center">
              ↓
            </Typography>
            <Typography variant="h5" align="center">
              2. You will get LP tokens from
            </Typography>
            <Typography variant="h5" align="center">
              UNISWAP automatically right after stake
            </Typography>
            <Typography variant="h5" align="center">
              ↓
            </Typography>
            <Typography variant="h5" align="center">
              3.Then stake LP tokens and earn BAG
            </Typography>
          </div>
          <Button
            className={classes.button}
            component="a"
            href="https://uniswap.org/"
          >
            Go to Liquidity Pool
          </Button>
        </div>
      </SmallModal>
    </Modal>
  );
};
