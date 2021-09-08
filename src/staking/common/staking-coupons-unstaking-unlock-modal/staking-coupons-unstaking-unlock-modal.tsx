import React from 'react';
import { useAsyncFn } from 'react-use';

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
  onUnstake: () => Promise<void>;
  amount: string;
};

export const StakingCouponsUnstakingUnlockModal: React.VFC<StakingCouponsUnstakingUnlockModalProps> =
  (props) => {
    const classes = useStakingCouponsUnstakingUnlockModalStyles();

    const [unstakeState, handleUnstake] = useAsyncFn(async () => {
      await props.onUnstake();

      props.onConfirm(true);
    });

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
                The yBAG token is just a technical representation of the BAG
                token. It is used only for staking.
              </Typography>
              <Typography variant="h5">
                You can convert yBAG back to BAG at any time at a 1:1 ratio.
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleUnstake}
              size="medium"
              loading={unstakeState.loading}
            >
              Unstake
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
