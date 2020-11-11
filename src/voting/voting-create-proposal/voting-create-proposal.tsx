import { useFormik } from 'formik';
import React from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { Input, Button, useGovernorContract } from 'src/common';
import { useVotingCreateProposalStyles } from './voting-create-proposal.styles';

export const VotingCreateProposal: React.FC = () => {
  const governorContract = useGovernorContract();
  const classes = useVotingCreateProposalStyles();
  const { library, account } = useWeb3React<Web3>();

  const formik = useFormik({
    initialValues: {
      address: '',
      action: '',
      description: '',
      value: ''
    },

    onSubmit: async (formValues) => {
      if (!library || !governorContract || !account) return;

      await governorContract?.methods
        .propose(
          [formValues.address],
          [0],
          [formValues.action],
          [library.eth.abi.encodeParameters(['uint256'], [formValues.value])],
          formValues.description
        )
        .send({ from: account, gas: 2000000 });
    }
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Input
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <Input
        name="address"
        label="Address"
        value={formik.values.address}
        onChange={formik.handleChange}
      />
      <Input
        name="action"
        label="Action"
        value={formik.values.action}
        onChange={formik.handleChange}
      />
      <Input
        name="value"
        label="value"
        type="number"
        value={formik.values.value}
        onChange={formik.handleChange}
      />
      <Button type="submit">Propose</Button>
    </form>
  );
};
