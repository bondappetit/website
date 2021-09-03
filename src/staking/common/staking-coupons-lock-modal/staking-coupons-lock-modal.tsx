import React from 'react';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral
} from 'src/common';
import { useStakingCouponsLockModalStyles } from './staking-coupons-lock-modal.styles';

export type StakingCouponsLockModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  balance: string;
};

export const StakingCouponsLockModal: React.VFC<StakingCouponsLockModalProps> =
  (props) => {
    const classes = useStakingCouponsLockModalStyles();

    const handleLock = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" component="div">
                <Typography variant="inherit" weight="semibold" component="div">
                  Lock {humanizeNumeral(props.balance)} BAG for 3 months
                </Typography>
                <Typography
                  variant="inherit"
                  component="div"
                  className={classes.steps}
                >
                  Step 2 of 2
                </Typography>
              </Typography>
              <Typography variant="h5">
                Unstaking starts: March 14
                <br />
                Unstaking period: 7 days
              </Typography>
              <Typography variant="h5">
                If you left yout BAGs after unstakeperiod their lock will be
                prolongate for another 3 months
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleLock}
              size="medium"
            >
              Stake
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
