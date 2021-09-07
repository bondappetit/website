import React from 'react';
import { useAsyncFn } from 'react-use';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral,
  dateUtils
} from 'src/common';
import { useStakingCouponsLockModalStyles } from './staking-coupons-lock-modal.styles';

export type StakingCouponsLockModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  onStake: () => Promise<void>;
  amount: string;
  steps: number;
  month: string;
  unstakingAt: string;
};

export const StakingCouponsLockModal: React.VFC<StakingCouponsLockModalProps> =
  (props) => {
    const classes = useStakingCouponsLockModalStyles();

    const [lockState, handleLock] = useAsyncFn(async () => {
      await props.onStake();

      props.onConfirm(true);
    }, []);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" component="div">
                <Typography variant="inherit" weight="semibold" component="div">
                  Lock {humanizeNumeral(props.amount)} BAG for {props.month}{' '}
                  months
                </Typography>
                <Typography
                  variant="inherit"
                  component="div"
                  className={classes.steps}
                >
                  Step {props.steps} of {props.steps}
                </Typography>
              </Typography>
              <Typography variant="h5">
                Unstaking starts:{' '}
                {dateUtils.format(props.unstakingAt, 'MMMM DD YYYY')}
                <br />
                Unstaking period: 7 days
              </Typography>
              <Typography variant="h5">
                If you left yout BAGs after unstakeperiod their lock will be
                prolongate for another {props.month} months
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleLock}
              size="medium"
              loading={lockState.loading}
            >
              Stake
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
