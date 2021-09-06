import React from 'react';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  dateUtils,
  humanizeNumeral
} from 'src/common';
import { useStakingCouponsUnstakingAttentionModalStyles } from './staking-coupons-unstaking-attention-modal.styles';

export type StakingCouponsUnstakingAttentionModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  unstakingAt: string;
  amount: string;
};

export const StakingCouponsUnstakingAttentionModal: React.VFC<StakingCouponsUnstakingAttentionModalProps> =
  (props) => {
    const classes = useStakingCouponsUnstakingAttentionModalStyles();

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
                Unstaking period starts at{' '}
                {dateUtils.format(props.unstakingAt, 'MMMM DD')}.
                If&nbsp;you&nbsp;unstake your BAGs now{' '}
                <Typography variant="inherit" weight="semibold">
                  you will lose 50%&nbsp;of&nbsp;earned rewards (
                  {humanizeNumeral(props.amount)} USDC)
                </Typography>
                . Be sure&nbsp;you want to unstake anyway or wait
                till&nbsp;unstaking period starts.
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleContinue}
              size="medium"
            >
              Unstake anyway
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
