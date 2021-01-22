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
import { config } from 'src/config';
import { useInvestingSubscribeFormStyles } from './investing-subscribe-form.styles';
import { InvestingSuccessSubscribe } from '../common';

export type InvestingSubscribeFormProps = {
  open: boolean;
  onClose: () => void;
};

export const InvestingSubscribeForm: React.FC<InvestingSubscribeFormProps> = (
  props
) => {
  const classes = useInvestingSubscribeFormStyles();

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
      const query = Object.entries(formValues)
        .flatMap(([key, value]) => {
          return `fields[${key}]=${value}`;
        })
        .join('&');

      try {
        await fetch(
          `${config.UNISENDER_API}&list_ids=2&${query}&double_optin=3`,
          {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'content-type': 'text/plain' }
          }
        );

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
      <InvestingSuccessSubscribe
        name={formik.values.Name}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};
