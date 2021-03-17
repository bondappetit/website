import { useFormik } from 'formik';

import { isEmail } from 'src/common';
import { subscribeApi } from './subscribe-api';

const LIST_ID = '38';

export const useSubscribeNews = (toggle: (value: boolean) => void) => {
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
      try {
        await subscribeApi.subscribe(LIST_ID, formValues);

        toggle(true);
      } catch (error) {
        console.error(error.message);
      }
    }
  });

  return formik;
};
