import React from 'react';

import { Modal, SmallModal, Typography, Button } from 'src/common';
import { useContactsSuccessStyles } from './contacts-success.styles';

export type ContactsSuccessProps = {
  onClose?: () => void;
  open: boolean;
};

export const ContactsSuccess: React.FC<ContactsSuccessProps> = (props) => {
  const classes = useContactsSuccessStyles();

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
