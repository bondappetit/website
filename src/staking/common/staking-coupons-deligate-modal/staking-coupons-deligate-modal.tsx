import React from 'react';
import { useAsyncFn } from 'react-use';

import { Button, SmallModal, Typography, Modal } from 'src/common';
import { useStakingCouponsDeligateModalStyles } from './staking-coupons-deligate-modal.styles';

export type StakingCouponsDeligateModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  onDelegate: () => Promise<void>;
  steps: number;
};

export const StakingCouponsDeligateModal: React.VFC<StakingCouponsDeligateModalProps> =
  (props) => {
    const classes = useStakingCouponsDeligateModalStyles();

    const [deployState, handleDeploy] = useAsyncFn(async () => {
      await props.onDelegate();

      props.onConfirm(false);
    }, []);
    const handleContinue = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" component="div">
                <Typography variant="inherit" weight="semibold" component="div">
                  Deligate votes
                </Typography>
                <Typography
                  variant="inherit"
                  component="div"
                  className={classes.steps}
                >
                  Step 1 of {props.steps}
                </Typography>
              </Typography>
              <Typography variant="h5">
                If you want to retain your right to vote, you need to deploy a
                special contract.
              </Typography>
              <Typography variant="h5">
                It is{' '}
                <Typography variant="inherit" weight="semibold">
                  optional
                </Typography>{' '}
                and{' '}
                <Typography variant="inherit" weight="semibold">
                  one-time
                </Typography>{' '}
                action. Skip it if you do NOT want to retain your right to vote.
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleDeploy}
              size="medium"
              loading={deployState.loading}
            >
              Deploy contract
            </Button>
            <Button
              className={classes.continue}
              onClick={handleContinue}
              size="medium"
            >
              Continue without delegation
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
