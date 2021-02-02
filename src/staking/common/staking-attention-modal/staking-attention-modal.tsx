import React from 'react';

import { Button, SmallModal, Typography, Modal } from 'src/common';
import { useStakingAttentionModalStyles } from './staking-attention-modal.styles';

export type StakingAttentionModalProps = {
  className?: string;
  open: boolean;
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
              6 month locking
            </Typography>
            <Typography variant="h5">
              Your LP tokens will be locked for 6 month. You can get your tokens
              at 00:09:57 March 14 after 9915046 block
            </Typography>{' '}
            <Typography variant="h5">
              You wil be able to claim all rewards anytime.
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
