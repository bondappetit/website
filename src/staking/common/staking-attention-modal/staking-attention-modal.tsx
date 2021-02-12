import React from 'react';

import { Button, SmallModal, Typography, Modal } from 'src/common';
import { useStakingAttentionModalStyles } from './staking-attention-modal.styles';

export type StakingAttentionModalProps = {
  className?: string;
  open: boolean;
  blockNumber: string;
  date: string;
  onClose: () => void;
  onStake: () => void;
};

export const StakingAttentionModal: React.FC<StakingAttentionModalProps> = (
  props
) => {
  const classes = useStakingAttentionModalStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          <div className={classes.content}>
            <Typography variant="h5" weight="bold">
              <Typography variant="inherit" className={classes.attention}>
                Attention!
              </Typography>{' '}
              6-month locking
            </Typography>
            <Typography variant="h5">
              Your LP tokens will be locked for 6 months. You can get your
              tokens at {props.date} after the {props.blockNumber} block
            </Typography>{' '}
            <Typography variant="h5">
              You will be able to claim the staking reward anytime.
            </Typography>
          </div>
          <Button className={classes.button} onClick={props.onStake}>
            Stake
          </Button>
        </div>
      </SmallModal>
    </Modal>
  );
};
