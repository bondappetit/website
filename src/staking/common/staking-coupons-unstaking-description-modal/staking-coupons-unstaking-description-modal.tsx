import React from 'react';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral
} from 'src/common';
import { useStakingCouponsUnstakingDescriptionModalStyles } from './staking-coupons-unstaking-description-modal.styles';

export type StakingCouponsUnstakingDescriptionModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  amount: string;
};

export const StakingCouponsUnstakingDescriptionModal: React.VFC<StakingCouponsUnstakingDescriptionModalProps> =
  (props) => {
    const classes = useStakingCouponsUnstakingDescriptionModalStyles();

    const handleContinue = () => props.onConfirm(true);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" weight="semibold">
                Unstake {humanizeNumeral(props.amount)} BAG
              </Typography>
              <Typography variant="h5">
                To unstake your BAG you have to make two transactions:
              </Typography>
              <Typography variant="h5" component="div">
                <ol className={classes.list}>
                  <li>Unlock your yBAG</li>
                  <li>Convert yBAG to BAG</li>
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
