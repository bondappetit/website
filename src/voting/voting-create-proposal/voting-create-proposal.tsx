import { useFormik } from 'formik';
import React, { useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import {
  Input,
  Button,
  useGovernorContract,
  Modal,
  ButtonBase
} from 'src/common';
import { VotingAddAction, VotingAddActionFormValues } from '../common';
import { useVotingCreateProposalStyles } from './voting-create-proposal.styles';

type FormValues = {
  actions: VotingAddActionFormValues[];
  description: string;
  value: string;
};

export const VotingCreateProposal: React.FC = () => {
  const governorContract = useGovernorContract();
  const classes = useVotingCreateProposalStyles();
  const { library, account } = useWeb3React<Web3>();
  const [addVotingOpen, setAddVotingOpen] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      actions: [],
      description: '',
      value: ''
    },

    onSubmit: async (formValues) => {
      if (!library || !governorContract || !account) return;

      const callDatas = formValues.actions.flatMap(({ input }) => {
        const [paramTypes = [], paramValues = []] = input.reduce<
          [string[], string[]]
        >(
          ([params, values], { paramType, value }) => {
            params.push(paramType);
            values.push(value);

            return [params, values];
          },
          [[], []]
        );

        return library.eth.abi.encodeParameters(paramTypes, paramValues);
      });

      const signatures = formValues.actions.map(
        ({ functionSig, input }) =>
          `${functionSig}(${input
            .map(({ paramType }) => paramType)
            .join(', ')})`
      );

      const values = formValues.actions.map(({ payable = 0 }) => payable);

      const addresses = formValues.actions.map(({ address = '' }) => address);

      await governorContract?.methods
        .propose(
          addresses,
          values,
          signatures,
          callDatas,
          formValues.description
        )
        .send({ from: account, gas: 2000000 });
    }
  });

  return (
    <>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Input
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <div>
          {formik.values.actions.map(
            ({ functionSig, input, contract }, index) => {
              const inputArgs = input
                .map(
                  (test) =>
                    `${test.paramName}:${test.paramType} = ${test.value}`
                )
                .join(', ');

              const method = `${
                index + 1
              }: ${contract}.${functionSig}(${inputArgs})`;

              return (
                <React.Fragment key={method}>
                  <div>{method}</div>
                  <ButtonBase
                    type="button"
                    onClick={() =>
                      formik.setFieldValue(
                        'actions',
                        formik.values.actions.filter((_, i) => i !== index)
                      )
                    }
                  >
                    remove
                  </ButtonBase>
                </React.Fragment>
              );
            }
          )}
        </div>
        <Button type="button" onClick={() => setAddVotingOpen(true)}>
          add action
        </Button>
        <Button type="submit">Propose</Button>
      </form>
      <Modal open={addVotingOpen} onClose={() => setAddVotingOpen(false)}>
        <VotingAddAction
          onSubmit={(formValues) => {
            formik.setFieldValue('actions', [
              ...formik.values.actions,
              formValues
            ]);
            setAddVotingOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
