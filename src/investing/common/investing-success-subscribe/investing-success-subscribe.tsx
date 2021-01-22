import React from 'react';

import { Modal, SmallModal, Typography, Button } from 'src/common';
import { useInvestingSuccessSubscribeStyles } from './investing-success-subscribe.styles';

export type InvestingSuccesSubscribeProps = {
  onClose: () => void;
  open: boolean;
  name: string;
};

export const InvestingSuccessSubscribe: React.FC<InvestingSuccesSubscribeProps> = (
  props
) => {
  const classes = useInvestingSuccessSubscribeStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          <Typography variant="h4" align="center" className={classes.text}>
            Thank you, {props.name}!<br />
            We will notify you as soon as or pre-sale round starts.
          </Typography>
          <Button onClick={props.onClose}>Got It</Button>
        </div>
      </SmallModal>
    </Modal>
  );
};
