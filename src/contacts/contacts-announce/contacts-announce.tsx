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
import { contactsApi, ContactsSuccess, useContactsStyles } from '../common';

export type ContactsAnnounceProps = {
  open: boolean;
  onClose: () => void;
};

const LIST_ID = '2';

export const ContactsAnnounce: React.FC<ContactsAnnounceProps> = (props) => {
  const classes = useContactsStyles();

  const [open, toggle] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: ''
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const errors: Partial<typeof formValues> = {};

      if (!formValues.email) {
        errors.email = 'Required';
      }

      if (!formValues.name) {
        errors.name = 'Required';
      }

      if (!isEmail(formValues.email)) {
        errors.email = 'invalid email';
      }

      return errors;
    },

    onSubmit: async (formValues) => {
      try {
        await contactsApi.sendForm(LIST_ID, formValues);

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
          <form
            className={classes.root}
            onSubmit={formik.handleSubmit}
            noValidate
          >
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
                name="name"
                placeholder="Name"
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                className={classes.input}
                error={Boolean(formik.errors.name)}
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
      <ContactsSuccess open={open} onClose={handleClose}>
        Thank you, {formik.values.name}!<br />
        We will notify you as soon as or pre-sale round starts.
      </ContactsSuccess>
    </>
  );
};
