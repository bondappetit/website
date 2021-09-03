import React from 'react';

import { Button, SmallModal, Typography, Modal } from 'src/common';
import { useStakingCouponsAttentionModalStyles } from './staking-coupons-attention-modal.styles';

export type StakingCouponsAttentionModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
};

export const StakingCouponsAttentionModal: React.VFC<StakingCouponsAttentionModalProps> =
  (props) => {
    const classes = useStakingCouponsAttentionModalStyles();

    const handleContinue = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography
                variant="h5"
                weight="semibold"
                className={classes.attention}
              >
                Attention!
              </Typography>
              <Typography variant="h5">
                Once you lock your BAGs, you will be able to unstake them
                without restriction in unlocking period only (week before lock
                period ends);
              </Typography>
              <Typography variant="h5">
                If you unstake your bag before unlocking period you will lose
                50% of rewards you have earned.
              </Typography>
              <Typography variant="h5">
                You can claim 50% of rewards anytime and 50% in unlocking period
                only;
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleContinue}
              size="medium"
            >
              Continue
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
