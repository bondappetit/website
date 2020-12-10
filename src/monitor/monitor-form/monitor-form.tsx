import { useFormik } from 'formik';
import React, { useState } from 'react';

import { Input, Button, useBalance, Typography } from 'src/common';

export type MonitorFormProps = {
  contractAddress?: string;
};

export const MonitorForm: React.FC<MonitorFormProps> = (props) => {
  const getBalance = useBalance();
  const [balance, setBalance] = useState('0');

  const formik = useFormik({
    initialValues: {
      address: ''
    },

    validate: (formValues) => {
      const errors: { address?: string } = {};

      if (!formValues.address) {
        errors.address = 'Required';
      }

      return errors;
    },

    onSubmit: async (formValues) => {
      const balanceOfToken = await getBalance({
        tokenAddress: formValues.address,
        accountAddress: props.contractAddress
      });

      setBalance(balanceOfToken.toString());
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        onChange={formik.handleChange}
        name="address"
        label="Address"
        error={Boolean(formik.errors.address)}
        value={formik.values.address}
      />
      <Typography variant="body1">Balance: {balance}</Typography>
      <Button type="submit">Submit</Button>
    </form>
  );
};
