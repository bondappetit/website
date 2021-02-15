import React from 'react';

import { Modal, SmallModal, Typography, Button } from 'src/common';
import { useSubscribeSuccessStyles } from './subscribe-success.styles';

export type SubscribeSuccessProps = {
  onClose: () => void;
  open: boolean;
};

export const SubscribeSuccess: React.FC<SubscribeSuccessProps> = (props) => {
  const classes = useSubscribeSuccessStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          <Typography
            variant="h5"
            align="center"
            component="div"
            className={classes.text}
          >
            {props.children}
          </Typography>
          <Button onClick={props.onClose} className={classes.button}>
            Got It
          </Button>
        </div>
      </SmallModal>
    </Modal>
  );
};
