import { useFormik } from 'formik';
import React from 'react';
import { useToggle } from 'react-use';

import { Button, Input, isEmail } from 'src/common';
import { contactsApi, ContactsSuccess } from '../common';
import { useContactsFeedbackStyles } from './contacts-feedback.styles';

export type ContactsFeedbackProps = unknown;

const LIST_ID = '143';

export const ContactsFeedback: React.FC<ContactsFeedbackProps> = () => {
  const classes = useContactsFeedbackStyles();

  const [open, toggle] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const errors: Partial<typeof formValues> = {};

      if (!formValues.email) {
        errors.email = 'Email is required';
      }

      if (!formValues.name) {
        errors.name = 'Name is required';
      }

      if (!isEmail(formValues.email)) {
        errors.email = 'Invalid email';
      }

      return errors;
    },

    onSubmit: async (formValues, { resetForm }) => {
      try {
        await contactsApi.sendForm(LIST_ID, formValues);

        toggle(true);
        resetForm();
      } catch (error) {
        console.error(error.message);
      }
    }
  });

  return (
    <>
      <form className={classes.root} onSubmit={formik.handleSubmit} noValidate>
        <Input
          placeholder="Name"
          name="name"
          onChange={formik.handleChange}
          className={classes.input}
          value={formik.values.name}
          error={Boolean(formik.errors.name)}
        />
        <Input
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
          className={classes.input}
          value={formik.values.email}
          error={Boolean(formik.errors.email)}
        />
        <Button
          className={classes.button}
          type="submit"
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
        >
          {formik.errors.email ?? formik.errors.name ?? 'Contact'}
        </Button>
      </form>
      <ContactsSuccess open={open} onClose={toggle}>
        We will contact with you soon.
      </ContactsSuccess>
    </>
  );
};
