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
              <Typography variant="h5" weight="bold">
                <Typography variant="inherit" className={classes.attention}>
                  Attention!
                </Typography>{' '}
                Unstaking
              </Typography>
            </div>
            <Button
              onClick={props.onUnstake}
              disabled={props.loading}
              loading={props.loading}
            >
              Unstake
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };

export const useStakingUnstakeAttentionModal = (
  props: StakingUnstakeAttentionModalProps
) => useModal(<StakingUnstakeAttentionModal {...props} />);
