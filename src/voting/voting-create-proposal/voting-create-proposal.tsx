import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import BN from 'bignumber.js';
import { useToggle } from 'react-use';

import { Button, useGovernorContract, ButtonBase, Modal } from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  VotingAddAction,
  VotingAddActionFormValues,
  VotingInput,
  VotingMediumEditor,
  VotingActionList
} from '../common';
import { useVotingCreateProposalStyles } from './voting-create-proposal.styles';

type FormValues = {
  actions: VotingAddActionFormValues[];
  title: string;
  description: string;
  value: string;
};

export const VotingCreateProposal: React.FC = () => {
  const governorContract = useGovernorContract();
  const classes = useVotingCreateProposalStyles();
  const { library, account } = useWeb3React<Web3>();
  const [addActionOpen, toggleAddAction] = useToggle(false);
  const [
    editAction,
    setEditAction
  ] = useState<VotingAddActionFormValues | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      actions: [],
      title: '',
      description: '',
      value: ''
    },

    onSubmit: async (formValues, { resetForm }) => {
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

      const description = `#${formValues.title}\n${formValues.description}`;

      await governorContract?.methods
        .propose(addresses, values, signatures, callDatas, description)
        .send({ from: account, gas: 2000000 });

      resetForm();
    }
  });

  const { setFieldValue } = formik;

  const handleChangeActions = useCallback(
    (actions) => setFieldValue('actions', actions),
    [setFieldValue]
  );

  const handleEditAction = useCallback(
    (actionToEdit: VotingAddActionFormValues) => {
      setEditAction(actionToEdit);

      toggleAddAction(true);
    },
    [toggleAddAction]
  );

  const handleSubmitAction = useCallback(
    (formValues: VotingAddActionFormValues) => {
      const actions = formik.values.actions.map((action) => {
        if (action.address === formValues.address) {
          return formValues;
        }

        return action;
      });

      if (!editAction) {
        actions.push(formValues);
      }

      setFieldValue('actions', actions);

      setEditAction(null);
    },
    [setFieldValue, formik.values.actions, editAction]
  );

  return (
    <MainLayout>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <div className={classes.inputs}>
          <VotingInput
            name="title"
            label="Enter the name of proposal"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {!!formik.values.actions.length && (
            <VotingActionList
              actions={formik.values.actions}
              onAddAnother={toggleAddAction}
              onEdit={handleEditAction}
              onChange={handleChangeActions}
            />
          )}
          {!formik.values.actions.length && (
            <ButtonBase
              type="button"
              className={classes.button}
              onClick={toggleAddAction}
            >
              +Add Action
            </ButtonBase>
          )}
          <VotingMediumEditor
            value={formik.values.description}
            label="Write a description"
            onChange={(value) => formik.setFieldValue('description', value)}
          />
        </div>
        <Button
          type="submit"
          className={classes.submit}
          disabled={formik.isSubmitting}
        >
          Submit proposal
        </Button>
      </form>
      <Modal onClose={toggleAddAction} open={addActionOpen}>
        <VotingAddAction
          onClose={toggleAddAction}
          editAction={editAction}
          onSubmit={handleSubmitAction}
        />
      </Modal>
    </MainLayout>
  );
};
