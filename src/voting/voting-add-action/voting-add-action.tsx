import React, { useCallback, useMemo, useReducer, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useUpdateEffect } from 'react-use';

import {
  parseContractMethods,
  useNetworkConfig,
  Network,
  ContractMethodInput,
  SmallModal
} from 'src/common';
import {
  VOTING_PRESETS,
  VotingPreset as VotingPresetItem
} from 'src/voting-presets';
import {
  VotingActionSelect,
  VotingChooseButtons,
  VotingActionParameters,
  VotingPreset
} from '../common';
import { useVotingAddActionStyles } from './voting-add-action.styles';
import {
  votingAddActionReducer,
  initialState,
  nextStep,
  setVariant,
  prevStep,
  AddActionVariants,
  editInitialState
} from './voting-add-action.reducer';

export type VotingAddActionFormValues = {
  contract?: number | string;
  functionSig: string;
  input: (ContractMethodInput & { value: string })[];
  payable?: number;
  address?: string;
};

export type VotingAddActionProps = {
  onSubmit: (formValues: VotingAddActionFormValues) => void;
  onSubmitActions: (formValues: VotingAddActionFormValues[]) => void;
  onClose: () => void;
  editAction: VotingAddActionFormValues | null;
};

const votingPresets = VOTING_PRESETS.reduce<Record<string, VotingPresetItem>>(
  (acc, preset) => {
    acc[preset.title] = preset;

    return acc;
  },
  {}
);

export const VotingAddAction: React.FC<VotingAddActionProps> = (props) => {
  const networkConfig = useNetworkConfig();
  const classes = useVotingAddActionStyles();
  const [state, dispatch] = useReducer(
    votingAddActionReducer,
    props.editAction ? editInitialState : initialState
  );
  const [currentPreset, setPreset] = useState<VotingPresetItem | null>(null);

  const contracts = useMemo(() => {
    return Object.values(networkConfig.contracts).reduce<
      Record<string, Network['contracts'][number]>
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

  const handleOnBack = useCallback(() => {
    if (state.step === 0) {
      dispatch(setVariant(null));
    } else {
      dispatch(prevStep());
    }
  }, [state.step]);

  const handleOnNext = useCallback(() => dispatch(nextStep()), []);

  const { setFieldValue } = formik;

  const handleChange = useCallback(
    (field: string) => (value: string) => {
      if (!votingPresets[value]) {
        setFieldValue(field, value);
      } else {
        setPreset(votingPresets[value]);
      }

      handleOnNext();
    },
    [setFieldValue, handleOnNext]
  );

  const manualSteps = [
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
          {formik.values.contract} <br />
          {formik.values.functionSig}
        </>
      }
      contractMethod={methods?.[formik.values.functionSig]}
    />
  ];

  const templateSteps = [
    <VotingActionSelect
      title="Choose template"
      options={Object.keys(votingPresets)}
      onChange={handleChange('contract')}
    />,
    <VotingPreset
      preset={currentPreset}
      contracts={contracts}
      onClose={props.onClose}
      onSubmitActions={props.onSubmitActions}
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
      onBack={state.currentVariant ? handleOnBack : undefined}
    >
      <div className={classes.form}>
        {!state.currentVariant && (
          <VotingChooseButtons
            title="Add action"
            subtitle="Actions will be automaticaly executed in case of succesfull voting."
            buttons={[
              {
                title: 'Setup manually',
                subtitle: `Choose target and set functions to it.`,
                onClick: () => dispatch(setVariant(AddActionVariants.manually))
              },
              {
                title: 'Use template',
                subtitle: `Choose one of several presets and fill in your data to setup complete event`,
                onClick: () => dispatch(setVariant(AddActionVariants.template))
              }
            ]}
          />
        )}
        <FormikProvider value={formik}>
          {state.currentVariant === AddActionVariants.manually && (
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              {manualSteps[state.step]}
            </form>
          )}
        </FormikProvider>
        {state.currentVariant === AddActionVariants.template &&
          templateSteps[state.step]}
      </div>
    </SmallModal>
  );
};
