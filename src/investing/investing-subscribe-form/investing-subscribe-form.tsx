import React from 'react';
import { useFormik } from 'formik';

import {
  Modal,
  SmallModal,
  Input,
  Button,
  Typography,
  isEmail
} from 'src/common';
import { config } from 'src/config';
import { useInvestingSubscribeFormStyles } from './investing-subscribe-form.styles';

export type InvestingSubscribeFormProps = {
  open: boolean;
  onClose: () => void;
};

export const InvestingSubscribeForm: React.FC<InvestingSubscribeFormProps> = (
  props
) => {
  const classes = useInvestingSubscribeFormStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      Name: ''
    },

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
      const query = Object.entries(formValues)
        .flatMap(([key, value]) => {
          return `fields[${key}]=${value}`;
        })
        .join('&');
      try {
        const res = await fetch(
          `${config.UNISENDER_API}&list_ids=2&${query}&double_optin=3`,
          {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'content-type': 'text/plain' }
          }
        );
        await res.json();
      } catch (error) {
        console.warn(error);
      } finally {
        props.onClose();
      }
    }
  });

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <form className={classes.root} onSubmit={formik.handleSubmit}>
          <div className={classes.inner}>
            <Typography variant="body1">
              Your email address and name:
            </Typography>
            <Input
              variant="small"
              name="email"
              placeholder="Enter address"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              className={classes.input}
            />
            <Input
              variant="small"
              name="Name"
              placeholder="Name"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              className={classes.input}
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
  );
};
