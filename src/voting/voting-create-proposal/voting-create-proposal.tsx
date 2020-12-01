import { useFormik } from 'formik';
import React, { useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import BN from 'bignumber.js';

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

export type VotingCreateProposalProps = {
  onSubmit: () => void;
};

export const VotingCreateProposal: React.FC<VotingCreateProposalProps> = (
  props
) => {
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
        const [paramTypes, paramValues] = input.reduce<[string[], string[]]>(
          ([params, values], { paramType, value }) => {
            params.push(paramType);
            const newValue =
              paramType === 'uint256'
                ? new BN(value).multipliedBy(new BN(10).pow(6)).toString(10)
                : value;

            values.push(newValue);

            return [params, values];
          },
          [[], []]
        );

        return library.eth.abi.encodeParameters(paramTypes, paramValues);
      });

      const signatures = formValues.actions.map(
        ({ functionSig, input }) =>
          `${functionSig}(${input.map(({ paramType }) => paramType).join()})`
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

      props.onSubmit();
    }
  });

  return (
    <>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Input
          name="description"
          label="Description"
          disabled={formik.isSubmitting}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <div>
          {formik.values.actions.map(
            ({ functionSig, input, contract }, index) => {
              const inputArgs = input
                .map(
                  (arg) => `${arg.paramName}:${arg.paramType} = ${arg.value}`
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
                    disabled={formik.isSubmitting}
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
        <Button
          type="button"
          onClick={() => setAddVotingOpen(true)}
          disabled={formik.isSubmitting}
        >
          add action
        </Button>
        <Button type="submit" disabled={formik.isSubmitting}>
          Propose
        </Button>
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
