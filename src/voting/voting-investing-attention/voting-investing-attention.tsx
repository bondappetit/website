import React from 'react';

import { Button, Modal, SmallModal, Typography } from 'src/common';
import { useVotingInvestingAttentionStyles } from './voting-investing-attention.styles';

export type VotingInvestingAttentionProps = {
  onClose: () => void;
  open: boolean;
  onBuy: () => void;
};

export const VotingInvestingAttention: React.VFC<VotingInvestingAttentionProps> = (
  props
) => {
  const classes = useVotingInvestingAttentionStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          <div className={classes.content}>
            <Typography variant="h5" weight="bold">
              <Typography variant="inherit" className={classes.redTitle}>
                Attention!
              </Typography>{' '}
            </Typography>
            <Typography variant="h5">
              We&apos;re offering BAG tokens with a fixed price and a 6-month
              lockup period.
            </Typography>{' '}
            <Typography variant="h5">
              That means you won&apos;t be able to transfer or stake tokens for
              6 months, but you will be able to vote and create proposals with
              them.
            </Typography>
          </div>
          <Button className={classes.button} onClick={props.onBuy}>
            Buy
          </Button>
        </div>
      </SmallModal>
    </Modal>
  );
};
