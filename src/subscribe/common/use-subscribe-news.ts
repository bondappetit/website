import { useFormik } from 'formik';

import { isEmail, unisenderQueryString } from 'src/common';
import { config } from 'src/config';

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

  return formik;
};
