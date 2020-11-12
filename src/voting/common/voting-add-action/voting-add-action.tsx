import React, { useMemo } from 'react';
import { useFormik } from 'formik';

import {
  parseContractMethods,
  Select,
  SelectOption,
  useNetworkConfig,
  Input,
  Button,
  ContractMethodInput
} from 'src/common';
import { useVotingAddActionStyles } from './voting-add-action.styles';

export type VotingAddActionFormValues = {
  contract?: number | string;
  functionSig: string;
  input: (ContractMethodInput & { value: string })[];
  payable?: number;
  address?: string;
};

export type VotingAddActionProps = {
  onSubmit: (formValues: VotingAddActionFormValues) => void;
};

export const VotingAddAction: React.FC<VotingAddActionProps> = (props) => {
  const networkConfig = useNetworkConfig();
  const classes = useVotingAddActionStyles();

  const contracts = useMemo(() => {
    if (!networkConfig?.contracts) return;

    return Object.values(networkConfig?.contracts).filter(
      ({ voting }) => voting
    );
  }, [networkConfig]);

  const formik = useFormik<VotingAddActionFormValues>({
    initialValues: {
      functionSig: '',
      input: []
    },

    onSubmit: (formValues) => {
      if (formValues.contract === undefined) return;

      const contract = contracts?.[Number(formValues.contract)];

      props.onSubmit({
        ...formValues,
        contract: contract?.name,
        address: contract?.address
      });
    }
  });

  const methods = useMemo(() => {
    if (formik.values.contract === undefined) return;

    return parseContractMethods(contracts?.[Number(formik.values.contract)]);
  }, [contracts, formik.values.contract]);

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <Select
        label="Select Contract"
        value={formik.values.contract}
        onChange={(value) => formik.setFieldValue('contract', value)}
      >
        {contracts &&
          contracts.map(({ name }, index) => (
            <SelectOption key={name} value={index} label={name} />
          ))}
      </Select>
      <Select
        label="Select function"
        value={formik.values.functionSig}
        onChange={(value) => formik.setFieldValue('functionSig', value)}
      >
        {methods &&
          Object.values(methods).map(({ methodName }) => (
            <SelectOption
              key={methodName}
              value={methodName}
              label={methodName}
            />
          ))}
      </Select>
      {!!methods?.[formik.values.functionSig]?.inputs.length && (
        <>
          {methods[formik.values.functionSig].inputs.map((input, index) => {
            const paramType = input.paramType.length
              ? `(${input.paramType})`
              : '';

            const label = [input.paramName, paramType].filter(Boolean).join('');

            return (
              <Input
                key={input.paramName}
                name={`input.${index}`}
                value={formik.values.input[index]?.value ?? ''}
                onChange={({ currentTarget }) =>
                  formik.setFieldValue(currentTarget.name, {
                    value: currentTarget.value,
                    paramName: input.paramName,
                    paramType: input.paramType
                  })
                }
                label={label}
              />
            );
          })}
        </>
      )}
      {methods?.[formik.values.functionSig]?.payable && (
        <Input
          label="Value"
          name="payable"
          value={formik.values.payable ?? 0}
          onChange={formik.handleChange}
          type="text"
        />
      )}
      <Button type="submit">add action</Button>
    </form>
  );
};
