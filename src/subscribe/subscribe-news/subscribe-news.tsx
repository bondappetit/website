import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import { Modal, SmallModal, Input, Button, Typography } from 'src/common';
import {
  SubscribeSuccess,
  useSubscribeNews,
  useSubscribeStyles
} from '../common';

export type SubscribeNewsProps = {
  open: boolean;
  onClose: () => void;
};

export const SubscribeNews: React.FC<SubscribeNewsProps> = (props) => {
  const classes = useSubscribeStyles();

  const [open, toggle] = useToggle(false);

  const formik = useSubscribeNews(toggle);

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
      <SubscribeSuccess open={open} onClose={handleClose}>
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
      </SubscribeSuccess>
    </>
  );
};
