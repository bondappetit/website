import React from 'react';
import { useFormik } from 'formik';

import { Button, Input, Typography, Select, SelectOption } from 'src/common';

export type OracleSaveFormValues = {
  isin: string;
  value: string;
  property: string;
  paramType: string;
};

export type OracleSaveFormProps = {
  onSubmit: (formValues: OracleSaveFormValues) => Promise<void>;
  withSelect?: boolean;
};

export const OracleSaveForm: React.FC<OracleSaveFormProps> = (props) => {
  const formik = useFormik<OracleSaveFormValues>({
    initialValues: {
      isin: '',
      value: '',
      property: '',
      paramType: ''
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

      if (!formValues.paramType && props.withSelect) {
        error.paramType = 'required';
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
            value={formik.values.paramType}
            onChange={(value) => formik.setFieldValue('paramType', value)}
          >
            <SelectOption value="uint256" label="uint256" />
          </Select>
          {formik.errors.paramType && (
            <Typography variant="body2">{formik.errors.paramType}</Typography>
          )}
        </div>
      )}
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
