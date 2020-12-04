import React, { useCallback, useMemo, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useUpdateEffect } from 'react-use';

import {
  parseContractMethods,
  useNetworkConfig,
  Network,
  ContractMethodInput,
  SmallModal
} from 'src/common';
import { VotingActionSelect } from '../voting-action-select';
import { useVotingAddActionStyles } from './voting-add-action.styles';
import { VotingActionParameters } from '../voting-action-parameters';
import { VotingChooseButtons } from '../voting-choose-buttons';

export type VotingAddActionFormValues = {
  contract?: number | string;
  functionSig: string;
  input: (ContractMethodInput & { value: string })[];
  payable?: number;
  address?: string;
};

export type VotingAddActionProps = {
  onSubmit: (formValues: VotingAddActionFormValues) => void;
  onClose: () => void;
  editAction: VotingAddActionFormValues | null;
};

export const VotingAddAction: React.FC<VotingAddActionProps> = (props) => {
  const networkConfig = useNetworkConfig();
  const classes = useVotingAddActionStyles();
  const [step, setStep] = useState(props.editAction ? 3 : 0);

  const contracts = useMemo(() => {
    if (!networkConfig?.contracts) return;

    return Object.values(networkConfig?.contracts).reduce<
      Record<string, Network['contracts']['0']>
    >((acc, contract) => {
      if (contract.voting) {
        acc[contract.name] = contract;
      }

      return acc;
    }, {});
  }, [networkConfig]);

  const formik = useFormik<VotingAddActionFormValues>({
    initialValues: {
      contract: undefined,
      functionSig: '',
      input: [],
      ...(props.editAction ? props.editAction : {})
    },

    validateOnBlur: false,
    validateOnChange: false,

    validate: (formValues) => {
      const error: Partial<{ input: string; payable: string }> = {};

      if (formValues.contract === undefined) return;

      const parsedMethods = parseContractMethods(
        contracts?.[formValues.contract]
      );

      if (
        parsedMethods?.[formValues.functionSig]?.inputs.length !==
        formValues.input.length
      ) {
        error.input = 'Required';
      }

      const input = formValues.input.every(({ value }) => value);

      if (!input) {
        error.input = 'Required';
      }

      if (
        parsedMethods?.[formValues.functionSig]?.payable &&
        formValues.payable === undefined
      ) {
        error.input = 'Required';
      }

      return error;
    },

    onSubmit: (formValues, { resetForm }) => {
      if (formValues.contract === undefined) return;

      const contract = contracts?.[formValues.contract];

      props.onSubmit({
        ...formValues,
        contract: contract?.name,
        address: contract?.address
      });

      setStep(0);
      resetForm();
      props.onClose();
    }
  });

  const contractNames = useMemo(() => {
    return contracts ? Object.keys(contracts) : [];
  }, [contracts]);

  const methods = useMemo(() => {
    if (formik.values.contract === undefined) return;

    const parsedMethods = parseContractMethods(
      contracts?.[formik.values.contract]
    );

    return parsedMethods;
  }, [contracts, formik.values.contract]);

  const methodNames = useMemo(() => {
    return methods
      ? Object.values(methods).map(({ methodName }) => methodName)
      : [];
  }, [methods]);

  const handleOnBack = useCallback(
    () => setStep((previousStep) => previousStep - 1),
    []
  );
  const handleOnNext = useCallback(
    () => setStep((previousStep) => previousStep + 1),
    []
  );

  const { setFieldValue } = formik;

  const handleChange = useCallback(
    (field: string) => (value: string) => {
      setFieldValue(field, value);

      handleOnNext();
    },
    [setFieldValue, handleOnNext]
  );

  const steps = [
    <VotingChooseButtons
      title="Add action"
      subtitle="Actions will be automaticaly executed in case of succesfull voting."
      buttons={[
        {
          title: 'Setup manualy',
          subtitle: `Choose target and set functions to it.`,
          onClick: handleOnNext
        },
        {
          title: 'Use template',
          subtitle: `Choose one of several presets and fill in your data to setup complete event`,
          onClick: () => {}
        }
      ]}
    />,
    <VotingActionSelect
      title="Select target"
      options={contractNames}
      onChange={handleChange('contract')}
    />,
    <VotingActionSelect
      title={formik.values.contract}
      options={methodNames}
      onChange={handleChange('functionSig')}
    />,
    <VotingActionParameters
      title={
        <>
          {formik.values.contract}
          <br /> {formik.values.functionSig}
        </>
      }
      contractMethod={methods?.[formik.values.functionSig]}
    />
  ];

  useUpdateEffect(() => {
    formik.setFieldValue('functionSig', '');
  }, [formik.values.contract]);

  useUpdateEffect(() => {
    formik.setFieldValue('input', []);
  }, [formik.values.functionSig]);

  return (
    <SmallModal
      onClose={props.onClose}
      onBack={step > 0 ? handleOnBack : undefined}
    >
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <FormikProvider value={formik}>{steps[step]}</FormikProvider>
      </form>
    </SmallModal>
  );
};
