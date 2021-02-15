import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import { useToggle } from 'react-use';

import {
  Modal,
  SmallModal,
  Input,
  Button,
  Typography,
  isEmail,
  unisenderQueryString
} from 'src/common';
import { config } from 'src/config';
import { SubscribeSuccess, useSubscribeStyles } from '../common';

export type SubscribeNewsProps = {
  open: boolean;
  onClose: () => void;
};

export const SubscribeNews: React.FC<SubscribeNewsProps> = (props) => {
  const classes = useSubscribeStyles();

  const [open, toggle] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      email: ''
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const errors: Partial<typeof formValues> = {};

      if (!formValues.email) {
        errors.email = 'Required';
      }

      if (!isEmail(formValues.email)) {
        errors.email = 'invalid email';
      }

      return errors;
    },

    onSubmit: async (formValues) => {
      const query = unisenderQueryString(formValues);

      try {
        await fetch(
          `${config.UNISENDER_API}&list_ids=38&${query}&double_optin=3`,
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
          Thanks for subscriprion!
        </Typography>
        We will share with you the hotest news and latest updates of
        BondAppétit.
      </SubscribeSuccess>
    </>
  );
};
