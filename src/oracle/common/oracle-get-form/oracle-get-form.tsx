import React from 'react';
import { useFormik } from 'formik';

import { Button, Input, Typography, Select, SelectOption } from 'src/common';

export type OracleGetFormValues = {
  isin: string;
  type: string;
  property: string;
};

export type OracleGetFormProps = {
  onSubmit: (formValues: OracleGetFormValues) => Promise<void>;
  withSelect?: boolean;
};

export const OracleGetForm: React.FC<OracleGetFormProps> = (props) => {
  const formik = useFormik<OracleGetFormValues>({
    initialValues: {
      isin: '',
      type: '',
      property: ''
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const error: Partial<OracleGetFormValues> = {};

      if (!formValues.isin) {
        error.isin = 'required';
      }

      if (!formValues.type && props.withSelect) {
        error.type = 'required';
      }

      if (!formValues.property && props.withSelect) {
        error.property = 'required';
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
      {props.withSelect && (
        <div>
          <Input
            type="text"
            onChange={formik.handleChange}
            name="property"
            label="Property"
            error={Boolean(formik.errors.property)}
            value={formik.values.property}
          />
          {formik.errors.property && (
            <Typography variant="body2">{formik.errors.property}</Typography>
          )}
        </div>
      )}
      {props.withSelect && (
        <div>
          <Select
            label="Type of parameter"
            value={formik.values.type}
            onChange={(value) => formik.setFieldValue('type', value)}
          >
            <SelectOption value="uint256" label="uint256" />
          </Select>
          {formik.errors.type && (
            <Typography variant="body2">{formik.errors.type}</Typography>
          )}
        </div>
      )}
      <Button type="submit">read</Button>
    </form>
  );
};
