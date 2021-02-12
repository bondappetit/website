import React from 'react';

import { Button, Link, SmallModal, Typography, Modal } from 'src/common';
import { useStakingAcquireModalStyles } from './staking-acquire-modal.styles';

export type StakingAcquireModalProps = {
  open: boolean;
  onClose: () => void;
  tokenName?: string;
  tokenAddresses?: string[];
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
            <Typography weight="bold" variant="h5">
              To acquire {props.tokenName}.
            </Typography>
            <Typography variant="h5">
              1. Stake your BAG to{' '}
              <Link
                href={`https://app.uniswap.org/#/add/${props.tokenAddresses?.join(
                  '/'
                )}`}
                target="_blank"
                color="blue"
              >
                uniswap liquidity pool
              </Link>
            </Typography>
            <Typography variant="h5">
              2. You will get LP tokens from UNISWAP automatically right after
              stake
            </Typography>
            <Typography variant="h5">
              3.Then stake LP tokens and earn BAG
            </Typography>
          </div>
          <Button
            className={classes.button}
            component="a"
            target="_blank"
            href={`https://app.uniswap.org/#/add/${props.tokenAddresses?.join(
              '/'
            )}`}
          >
            Go to Liquidity Pool
          </Button>
        </div>
      </SmallModal>
    </Modal>
  );
};
