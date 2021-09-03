import React from 'react';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral
} from 'src/common';
import { useStakingCouponsUnstakingUnlockModalStyles } from './staking-coupons-unstaking-unlock-modal.styles';

export type StakingCouponsUnstakingUnlockModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  amount: string;
};

export const StakingCouponsUnstakingUnlockModal: React.VFC<StakingCouponsUnstakingUnlockModalProps> =
  (props) => {
    const classes = useStakingCouponsUnstakingUnlockModalStyles();

    const handleConvert = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" component="div">
                <Typography variant="inherit" weight="semibold" component="div">
                  Unlock {humanizeNumeral(props.amount)} yBAG
                </Typography>
                <Typography
                  variant="inherit"
                  component="div"
                  className={classes.steps}
                >
                  Step 1 of 2
                </Typography>
              </Typography>
              <Typography variant="h5">
                yBAG is a techincal token which allows you to earn rewards from
                bonds coupon profit.
              </Typography>
              <Typography variant="h5">
                yBAG = BAG always, and you can convert it back anytime you
                decide to unstake.
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleConvert}
              size="medium"
            >
              Convert
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
