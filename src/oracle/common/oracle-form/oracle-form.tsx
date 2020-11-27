import React from 'react';
import { useFormik } from 'formik';

import { Button, Input, Typography } from 'src/common';

export type OracleFormValues = {
  isin: string;
  value: string;
};

export type OracleFormProps = {
  onSubmit: (formValues: OracleFormValues) => Promise<void>;
};

export const OracleForm: React.FC<OracleFormProps> = (props) => {
  const formik = useFormik<OracleFormValues>({
    initialValues: {
      isin: '',
      value: ''
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const error: Partial<OracleFormValues> = {};

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
          type="number"
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
