import React from 'react';
import { useFormik } from 'formik';

import { Button, Input, Typography } from 'src/common';

export type OracleSaveFormValues = {
  isin: string;
  value: string;
};

export type OracleSaveFormProps = {
  onSubmit: (formValues: OracleSaveFormValues) => Promise<void>;
};

export const OracleSaveForm: React.FC<OracleSaveFormProps> = (props) => {
  const formik = useFormik<OracleSaveFormValues>({
    initialValues: {
      isin: '',
      value: ''
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const error: Partial<OracleSaveFormValues> = {};

      if (!formValues.isin) {
        error.isin = 'required';
      }

      if (!formValues.value) {
        error.value = 'required';
      }

      return error;
    },

    onSubmit: async (formValues, { resetForm }) => {
      await props.onSubmit(formValues);

      resetForm();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Input
          type="text"
          onChange={formik.handleChange}
          name="isin"
          label="ISIN"
          error={Boolean(formik.errors.isin)}
          value={formik.values.isin}
        />
        {formik.errors.isin && (
          <Typography variant="body2">{formik.errors.isin}</Typography>
        )}
      </div>
      <div>
        <Input
          type="number"
          onChange={formik.handleChange}
          name="value"
          label="Value"
          error={Boolean(formik.errors.value)}
          value={formik.values.value}
        />
        {formik.errors.value && (
          <Typography variant="body2">{formik.errors.value}</Typography>
        )}
      </div>
      <Button type="submit">save</Button>
    </form>
  );
};
