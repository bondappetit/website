import { useFormikContext } from 'formik';
import React from 'react';

import {
  Button,
  ContractMethod,
  ContractMethodInput,
  Input,
  Typography
} from 'src/common';
import { useVotingActionParametersStyles } from './voting-action-parameters.styles';

export type VotingAddActionFormValues = {
  contract?: number | string;
  functionSig: string;
  input: (ContractMethodInput & { value: string })[];
  payable?: number;
  address?: string;
};

export type VotingActionParametersProps = {
  title: React.ReactNode;
  contractMethod?: ContractMethod;
};

export const VotingActionParameters: React.FC<VotingActionParametersProps> = (
  props
) => {
  const formik = useFormikContext<VotingAddActionFormValues>();
  const classes = useVotingActionParametersStyles();

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {props.title}
      </Typography>
      <div className={classes.inputs}>
        {!!props.contractMethod?.inputs.length && (
          <>
            {props.contractMethod.inputs.map((input, index) => {
              const type = input.type.length ? `(${input.type})` : '';

              const label = [input.name, type].filter(Boolean).join('');

              return (
                <Input
                  key={input.name}
                  name={`input.${index}`}
                  variant="small"
                  value={formik.values.input[index]?.value ?? ''}
                  placeholder={`Enter ${input.name}...`}
                  className={classes.input}
                  onChange={({ currentTarget }) =>
                    formik.setFieldValue(currentTarget.name, {
                      value: currentTarget.value,
                      name: input.name,
                      type: input.type
                    })
                  }
                  label={label}
                />
              );
            })}
          </>
        )}
        {props.contractMethod?.payable && (
          <Input
            label="Value"
            name="payable"
            variant="small"
            value={formik.values.payable ?? 0}
            placeholder="Enter value..."
            onChange={formik.handleChange}
            className={classes.input}
            type="text"
          />
        )}
      </div>
      <Button type="submit" className={classes.button}>
        Add action
      </Button>
    </>
  );
};
