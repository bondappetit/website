import React from 'react';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral,
  dateUtils
} from 'src/common';
import { useStakingCouponsFinishModalStyles } from './staking-coupons-finish-modal.styles';

export type StakingCouponsFinishModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  amount: string;
  unstakingAt: string;
};

export const StakingCouponsFinishModal: React.VFC<StakingCouponsFinishModalProps> =
  (props) => {
    const classes = useStakingCouponsFinishModalStyles();

    const handleLock = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" component="div" align="center">
                {humanizeNumeral(props.amount)} BAG locked!
                <br />
                Unstaking at {dateUtils.format(props.unstakingAt, 'MMMM DD')}
                <br />
                <Typography
                  variant="inherit"
                  className={classes.votesDeligated}
                >
                  Votes delegated
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
