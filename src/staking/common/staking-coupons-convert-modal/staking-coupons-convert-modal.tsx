import React from 'react';
import { useAsyncFn } from 'react-use';

import {
  Button,
  SmallModal,
  Typography,
  Modal,
  humanizeNumeral
} from 'src/common';
import { useStakingCouponsConvertModalStyles } from './staking-coupons-convert-modal.styles';

export type StakingCouponsConvertModalProps = {
  onClose: () => void;
  onConfirm: (confirm: boolean) => void;
  onConvert: () => Promise<void>;
  amount: string;
  steps: number;
};

export const StakingCouponsConvertModal: React.VFC<StakingCouponsConvertModalProps> =
  (props) => {
    const classes = useStakingCouponsConvertModalStyles();

    const [convertState, handleConvert] = useAsyncFn(async () => {
      await props.onConvert();
      props.onConfirm(true);
    }, []);

    return (
      <Modal open onClose={props.onClose}>
        <SmallModal>
          <div className={classes.root}>
            <div className={classes.content}>
              <Typography variant="h5" component="div">
                <Typography variant="inherit" weight="semibold" component="div">
                  Convert {humanizeNumeral(props.amount)} BAG to yBAG
                </Typography>
                <Typography
                  variant="inherit"
                  component="div"
                  className={classes.steps}
                >
                  Step {props.steps - 1} of {props.steps}
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
              loading={convertState.loading}
            >
              Convert
            </Button>
          </div>
        </SmallModal>
      </Modal>
    );
  };
