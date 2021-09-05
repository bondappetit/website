import React from 'react';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral
} from 'src/common';
import { useStakingCouponsUnstakingConvertModalStyles } from './staking-coupons-unstaking-convert-modal.styles';

export type StakingCouponsUnstakingConvertModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  amount: string;
};

export const StakingCouponsUnstakingConvertModal: React.VFC<StakingCouponsUnstakingConvertModalProps> =
  (props) => {
    const classes = useStakingCouponsUnstakingConvertModalStyles();

    const handleConvert = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" component="div">
                <Typography variant="inherit" weight="semibold" component="div">
                  Convert {humanizeNumeral(props.amount)} yBAG to BAG
                </Typography>
                <Typography
                  variant="inherit"
                  component="div"
                  className={classes.steps}
                >
                  Step 2 of 2
                </Typography>
              </Typography>
              <Typography variant="h5">1 yBAG = 1 BAG</Typography>
              <Typography variant="h5">
                Your votes will be delegated back automaticaly, no extra
                transaction required
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleConvert}
              size="medium"
            >
              Unstake
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
