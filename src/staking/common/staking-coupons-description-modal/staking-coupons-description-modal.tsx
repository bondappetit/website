import React from 'react';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral
} from 'src/common';
import { useStakingCouponsDescriptionModalStyles } from './staking-coupons-description-modal.styles';

export type StakingCouponsDescriptionModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  amount: string;
  month: string;
  howToStake: boolean;
};

export const StakingCouponsDescriptionModal: React.VFC<StakingCouponsDescriptionModalProps> =
  (props) => {
    const classes = useStakingCouponsDescriptionModalStyles();

    const handleContinue = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" weight="semibold">
                {props.howToStake
                  ? 'How to stake'
                  : `Stake ${humanizeNumeral(props.amount)} BAG for ${
                      props.month
                    } months`}
              </Typography>
              <Typography variant="h5">
                To stake your BAG in coupon rewards pool you have to make
                several transactions:
              </Typography>
              <Typography variant="h5" component="div">
                <ol className={classes.list}>
                  {!props.howToStake && (
                    <li>Delegate votes (one-time and optional)</li>
                  )}
                  <li>Convert BAG to yBAG</li>
                  <li>
                    Then stake yBAG to earn coupons profit&nbsp;in&nbsp;USDC
                  </li>
                </ol>
              </Typography>
            </div>
            <Button
              className={classes.button}
              onClick={handleContinue}
              size="medium"
            >
              Continue
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
