import { useFormik } from 'formik';
import React from 'react';
import { useUpdateEffect } from 'react-use';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import {
  Button,
  useGovernorContract,
  ButtonBase,
  Head,
  estimateGas,
  useModal
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import { VotingInput, VotingMediumEditor, VotingActionList } from '../common';
import {
  VotingAddAction,
  VotingAddActionFormValues
} from '../voting-add-action';
import { useVotingCreateProposalStyles } from './voting-create-proposal.styles';

type FormValues = {
  actions: VotingAddActionFormValues[];
  title: string;
  description: string;
};

export const VotingCreateProposal: React.FC = () => {
  const governorContract = useGovernorContract();
  const classes = useVotingCreateProposalStyles();
  const { library, account, chainId } = useWeb3React<Web3>();
  const history = useHistory();

  const [openAddAction] = useModal(VotingAddAction);

  const formik = useFormik<FormValues>({
    initialValues: {
      actions: [],
      title: '',
      description: ''
    },

    onSubmit: async (formValues, { resetForm }) => {
      if (!library || !governorContract || !account) return;

      const callDatas = formValues.actions.flatMap(({ input }) => {
        const [types, paramValues] = input.reduce<[string[], string[]]>(
          ([params, values], { type, value }) => {
            params.push(type);
            values.push(value);

            return [params, values];
          },
          [[], []]
        );

        return library.eth.abi.encodeParameters(types, paramValues);
      });

      const signatures = formValues.actions.map(
        ({ functionSig, input }) =>
          `${functionSig}(${input.map(({ type }) => type).join()})`
      );

      const values = formValues.actions.map(({ payable = 0 }) => payable);

      const addresses = formValues.actions.map(({ address = '' }) => address);

      const description = `#${formValues.title}\n${formValues.description}`;

      const propose = governorContract.methods.propose(
        addresses,
        values,
        signatures,
        callDatas,
        description
      );

      await propose.send({
        from: account,
        gas: await estimateGas(propose, { from: account })
      });

      resetForm();
      history.push(URLS.voting.list);
    }
  });

  const { setFieldValue } = formik;

  const handleChangeActions = (actions: VotingAddActionFormValues[]) =>
    setFieldValue('actions', actions);

  const handleEditAction = async (
    actionToEdit: VotingAddActionFormValues,
    editActionIndex: number
  ) => {
    const result = await openAddAction({
      editAction: actionToEdit
    });

    setFieldValue(
      'actions',
      formik.values.actions.flatMap((previousAction, index) =>
        index === editActionIndex ? result : [previousAction]
      )
    );
  };

  const handleAddAction = async () => {
    try {
      const result = await openAddAction({
        editAction: null
      });

      setFieldValue('actions', [...formik.values.actions, ...result]);
    } catch (error) {
      console.error(error);
    }
  };

  useUpdateEffect(() => {
    setFieldValue('actions', []);
  }, [chainId]);

  return (
    <>
      <Head title="Create proposal" />
      <MainLayout>
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div className={classes.inputs}>
            <VotingInput
              name="title"
              label="Enter the name of proposal"
              value={formik.values.title}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
            />
            {!!formik.values.actions.length && (
              <VotingActionList
                actions={formik.values.actions}
                onAddAnother={handleAddAction}
                onEdit={handleEditAction}
                onChange={handleChangeActions}
              />
            )}
            {!formik.values.actions.length && (
              <ButtonBase
                type="button"
                className={classes.button}
                onClick={handleAddAction}
              >
                +Add Action
              </ButtonBase>
            )}
            <VotingMediumEditor
              value={formik.values.description}
              disabled={formik.isSubmitting}
              label="Write a description"
              onChange={(value) => formik.setFieldValue('description', value)}
            />
          </div>
          <Button
            type="submit"
            className={classes.submit}
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
          >
            Submit proposal
          </Button>
        </form>
      </MainLayout>
    </>
  );
};
