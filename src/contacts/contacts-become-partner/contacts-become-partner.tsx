import { useFormik } from 'formik';
import React from 'react';
import { useToggle } from 'react-use';

import {
  Button,
  Input,
  isEmail,
  Modal,
  SmallModal,
  Typography
} from 'src/common';
import { contactsApi, ContactsSuccess, useContactsStyles } from '../common';

export type ContactsBecomePartnerProps = {
  open: boolean;
  onClose: () => void;
};

const LIST_ID = '105';

export const ContactsBecomePartner: React.VFC<ContactsBecomePartnerProps> = (
  props
) => {
  const classes = useContactsStyles();

  const [open, toggle] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      companyName: ''
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
        errors.email = 'Invalid email';
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

  const handleClose = () => {
    props.onClose();
    toggle(false);
    formik.resetForm();
  };

  return (
    <>
      <Modal onClose={handleClose} open={props.open}>
        <SmallModal>
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <div className={classes.inner}>
              <Input
                name="email"
                placeholder="Enter address"
                className={classes.input}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={Boolean(formik.errors.email)}
              />
              <Input
                name="name"
                placeholder="Your name"
                className={classes.input}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={Boolean(formik.errors.name)}
              />
              <Input
                name="companyName"
                placeholder="Company/Project name"
                className={classes.input}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.companyName}
                error={Boolean(formik.errors.companyName)}
              />
            </div>
            <Button
              className={classes.modalButton}
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              type="submit"
            >
              Submit
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
          Submited
        </Typography>
        Thanks for your interest, We will contact you soon.
      </ContactsSuccess>
    </>
  );
};
