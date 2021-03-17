import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import { useToggle } from 'react-use';

import {
  Modal,
  SmallModal,
  Input,
  Button,
  Typography,
  isEmail
} from 'src/common';
import { subscribeApi, SubscribeSuccess, useSubscribeStyles } from '../common';

export type SubscribeAnnounceProps = {
  open: boolean;
  onClose: () => void;
};

const LIST_ID = '2';

export const SubscribeAnnounce: React.FC<SubscribeAnnounceProps> = (props) => {
  const classes = useSubscribeStyles();

  const [open, toggle] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      Name: ''
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const errors: Partial<typeof formValues> = {};

      if (!formValues.email) {
        errors.email = 'Required';
      }

      if (!formValues.Name) {
        errors.Name = 'Required';
      }

      if (!isEmail(formValues.email)) {
        errors.email = 'invalid email';
      }

      return errors;
    },

    onSubmit: async (formValues) => {
      try {
        await subscribeApi.subscribe(LIST_ID, formValues);

        toggle(true);
      } catch (error) {
        console.error(error.message);
      }
    }
  });

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
              <Typography variant="h5">Your email address and name:</Typography>
              <Input
                name="email"
                placeholder="Enter address"
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                className={classes.input}
                error={Boolean(formik.errors.email)}
              />
              <Input
                name="Name"
                placeholder="Name"
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                className={classes.input}
                error={Boolean(formik.errors.Name)}
              />
            </div>
            <Button
              className={classes.modalButton}
              type="submit"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Notify me
            </Button>
          </form>
        </SmallModal>
      </Modal>
      <SubscribeSuccess open={open} onClose={handleClose}>
        Thank you, {formik.values.Name}!<br />
        We will notify you as soon as or pre-sale round starts.
      </SubscribeSuccess>
    </>
  );
};
