import React from 'react';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral
} from 'src/common';
import { useStakingCouponsUnstakingFinishModalStyles } from './staking-coupons-unstaking-finish-modal.styles';

export type StakingCouponsUnstakingFinishModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  amount: string;
};

export const StakingCouponsUnstakingFinishModal: React.VFC<StakingCouponsUnstakingFinishModalProps> =
  (props) => {
    const classes = useStakingCouponsUnstakingFinishModalStyles();

    const handleLock = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" component="div" align="center">
                {humanizeNumeral(props.amount)} BAG unlocked!
                <br />
                <Typography
                  variant="inherit"
                  className={classes.votesDeligated}
                >
                  Votes delegated back
                </Typography>
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleLock}
              size="medium"
            >
              Finish
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
