import React from 'react';

import { Button, useModal, Modal, SmallModal, Typography } from 'src/common';
import { useStakingUnstakeAttentionModalStyles } from './staking-unstake-attention-modal.styles';

export type StakingUnstakeAttentionModalProps = {
  onUnstake: () => void;
  onClose?: () => void;
  loading: boolean;
};

const StakingUnstakeAttentionModal: React.VFC<StakingUnstakeAttentionModalProps> =
  (props) => {
    const classes = useStakingUnstakeAttentionModalStyles();

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography
                variant="h5"
                weight="bold"
                className={classes.attention}
              >
                Attention!
              </Typography>
              <br />
              <Typography variant="h5">
                1. Once you unstake your LP tokens, you will not be able to
                stake them again
              </Typography>
              <br />
              <Typography variant="h5">
                2. The USDap / USDC pool is closed for staking
              </Typography>
              <br />
              <Typography variant="h5">
                3. Staking rewards will be distributed at the same pool rate
                until the end of August 2021
              </Typography>
            </div>
            <Button
              onClick={props.onUnstake}
              disabled={props.loading}
              loading={props.loading}
            >
              Unstake anyway
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };

export const useStakingUnstakeAttentionModal = (
  props: StakingUnstakeAttentionModalProps
) => useModal(<StakingUnstakeAttentionModal {...props} />);
