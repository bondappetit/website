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
                You can exit the contract at any time, but if you leave during a
                lockup period, you will lose 50% of all accumulated income. The
                lockup period starts right after you stake your tokens and ends
                one week before the end of the staking period.
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
