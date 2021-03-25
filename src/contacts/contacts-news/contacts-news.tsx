import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import { Modal, SmallModal, Input, Button, Typography } from 'src/common';
import { ContactsSuccess, useContactsNews, useContactsStyles } from '../common';

export type ContactsNewsProps = {
  open: boolean;
  onClose: () => void;
};

export const ContactsNews: React.FC<ContactsNewsProps> = (props) => {
  const classes = useContactsStyles();

  const [open, toggle] = useToggle(false);

  const formik = useContactsNews(toggle);

  const handleClose = useCallback(() => {
    props.onClose();
    toggle(false);
  }, [toggle, props]);

  return (
    <>
      <Modal open={props.open} onClose={handleClose}>
        <SmallModal>
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <div className={classes.inner}>
              <Input
                name="email"
                placeholder="Enter address"
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                className={classes.input}
                value={formik.values.email}
                error={Boolean(formik.errors.email)}
              />
            </div>
            <Button
              className={classes.modalButton}
              type="submit"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Subscribe
            </Button>
          </form>
        </SmallModal>
      </Modal>
      <ContactsSuccess open={open} onClose={handleClose}>
        <Typography
          variant="inherit"
          weight="bold"
          component="div"
          align="center"
        >
          Thanks for subscription!
        </Typography>
        We will share with you the hotest news and latest updates of
        BondAppétit.
      </ContactsSuccess>
    </>
  );
};
